import React from "react";
import { Link } from "react-router-dom";

export default function TVCard({ show, onAdd, onRemove, isInWatchlist }) {
  const summary = show.summary ? show.summary.replace(/<[^>]+>/g, "") : "Özet yok";
  const short = summary.length > 140 ? summary.slice(0, 140) + "..." : summary;

  return (
    <div className="tvcard">
      <div className="poster">
        {show.image ? <img src={show.image.medium} alt={show.name} /> : <div className="no-poster">Poster Yok</div>}
      </div>

      <div className="card-body">
        <h3 className="card-title">{show.name}</h3>
        <div className="meta">
          {(show.genres || []).map((g) => <span className="chip" key={g}>{g}</span>)}
          {show.language && <span className="chip muted">{show.language}</span>}
          <span className="chip">⭐ {show.rating && show.rating.average ? show.rating.average : "—"}</span>
        </div>

        <p className="summary">{short}</p>

        <div className="card-actions">
          <Link to={`/show/${show.id}`} className="btn">Detay</Link>
          {!isInWatchlist ? (
            <button className="btn primary" onClick={() => onAdd(show)}>Gösterime Ekle</button>
          ) : (
            <button className="btn danger" onClick={() => onRemove(show.id)}>Kaldır</button>
          )}
        </div>
      </div>
    </div>
  );
}
