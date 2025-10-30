import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import './App.css';

import Home from "./components/Home";
import ShowDetail from "./components/ShowDetail";
import Footer from "./components/Footer";


const PAGE_SIZE_DEFAULT = 6;

const initialState = {
  isLoading: false,
  isError: false,
  query: "friends",
  filters: { genre: "all", language: "all", minRating: 0 },
  results: [],
  page: 1,
  pageSize: PAGE_SIZE_DEFAULT,
  watchlist: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, isError: false, results: action.payload, page: 1 };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload }, page: 1 };
    case "SET_WATCHLIST":
      return { ...state, watchlist: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload, page: 1 };
    case "ADD_WATCHLIST":
      if (state.watchlist.find((s) => s.id === action.payload.id)) return state;
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case "REMOVE_WATCHLIST":
      return { ...state, watchlist: state.watchlist.filter((s) => s.id !== action.payload) };
    case "CLEAR_WATCHLIST":
      return { ...state, watchlist: [] };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    let cancelled = false;
    async function fetchShows() {
      dispatch({ type: "FETCH_INIT" });
      try {
        const q = state.query || "";
        const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(q)}`;
        const res = await axios.get(url);
        if (cancelled) return;
        const shows = res.data.map((it) => it.show);
        dispatch({ type: "FETCH_SUCCESS", payload: shows });
      } catch (e) {
        if (!cancelled) dispatch({ type: "FETCH_FAILURE" });
      }
    }
    fetchShows();
    return () => {
      cancelled = true;
    };
   
  }, [state.query]);

  
  useEffect(() => {
    const saved = localStorage.getItem("movieclub_watchlist_v1");
    if (saved) {
      try {
        dispatch({ type: "SET_WATCHLIST", payload: JSON.parse(saved) });
      } catch (e) {
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movieclub_watchlist_v1", JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home state={state} dispatch={dispatch} />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>

        <Footer name="MARIA" />
      </div>
    </Router>
  );
}
