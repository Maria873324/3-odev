import React from "react";
import SearchBox from "./SearchBox";
import Filters from "./Filters";
import TVList from "./TVList";
import WatchlistPanel from "./WatchlistPanel";
import Pagination from "./pagination";

function applyFilters(shows, filters) {
  const { genre, language, minRating } = filters;
  return shows.filter((show) => {
    if (!show) return false;
  
    if (genre && genre !== "all") {
      const g = (show.genres || []).map((x) => x.toLowerCase());
      if (!g.includes(genre.toLowerCase())) return false;
    }

    if (language && language !== "all") {
      if (!show.language || show.language.toLowerCase() !== language.toLowerCase()) return false;
    }
    
    const r = show.rating && show.rating.average ? show.rating.average : 0;
    if (r < minRating) return false;
    return true;
  });
}

export default function Home({ state, dispatch }) {
  const { results, filters, page, pageSize, watchlist, isLoading, isError, query } = state;

  const filtered = applyFilters(results, filters);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

 
  const onSearch = (q) => dispatch({ type: "SET_QUERY", payload: q || "" });
  const setFilters = (f) => dispatch({ type: "SET_FILTERS", payload: f });
  const addToWatch = (show) => dispatch({ type: "ADD_WATCHLIST", payload: show });
  const removeFromWatch = (id) => dispatch({ type: "REMOVE_WATCHLIST", payload: id });
  const clearWatch = () => dispatch({ type: "CLEAR_WATCHLIST" });
  const setPage = (p) => {
    const safe = Math.max(1, Math.min(totalPages, p));
    dispatch({ type: "SET_PAGE", payload: safe });
  };

  return (
    <div className="home-layout">
      <header className="topbar">
        <h1>Kampüs Film Kulübü</h1>
        <div className="subtitle">Süleyman Demirel Üniversitesi - Film Kulübü</div>
      </header>

      <div className="controls">
        <SearchBox query={query} onSearch={onSearch} />
        <Filters filters={filters} setFilters={setFilters} shows={results} />
      </div>

      <div className="main-area">
        <div className="list-area">
          <TVList
            shows={paged}
            isLoading={isLoading}
            isError={isError}
            onAdd={addToWatch}
            onRemove={removeFromWatch}
            watchlistIds={watchlist.map((w) => w.id)}
          />

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>

        <aside className="watch-panel-area">
          <WatchlistPanel watchlist={watchlist} onRemove={removeFromWatch} onClear={clearWatch} />
        </aside>
      </div>
    </div>
  );
}
