import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let canceled = false;
    async function fetchAll() {
      setLoading(true);
      setError(false);
      try {
        const [sRes, eRes] = await Promise.all([
          axios.get(`https://api.tvmaze.com/shows/${id}`),
          axios.get(`https://api.tvmaze.com/shows/${id}/episodes`),
        ]);
        if (canceled) return;
        setShow(sRes.data);
        setEpisodes(eRes.data || []);
      } catch (e) {
        if (!canceled) setError(true);
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    fetchAll();
    return () => (canceled = true);
  }, [id]);

  if (loading) return <div className="state-box">Yükleniyor...</div>;
  if (error) return <div className="state-box error">Detay yüklenirken hata. <button onClick={() => window.location.reload()}>Tekrar dene</button></div>;

  return (
    <div className="detail-page">
      <Link to="/">← Geri</Link>
      <h2>{show.name}</h2>

      <div className="detail-top">
        <div className="detail-poster">{show.image ? <img src={show.image.medium} alt={show.name} /> : <div className="no-poster" />}</div>
        <div className="detail-info">
          <div dangerouslySetInnerHTML={{ __html: show.summary || "Özet yok" }} />
          <div><strong>Tür:</strong> {(show.genres || []).join(", ") || "—"}</div>
          <div><strong>Dil:</strong> {show.language}</div>
          <div><strong>Puan:</strong> {show.rating && show.rating.average ? show.rating.average : "—"}</div>
        </div>
      </div>

      <h3>Bölümler ({episodes.length})</h3>
      <ul className="episode-list">
        {episodes.map((ep) => (
          <li key={ep.id}>S{ep.season}E{ep.number} — {ep.name}</li>
        ))}
      </ul>
    </div>
  );
}
