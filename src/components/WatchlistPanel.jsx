import React from "react";

export default function WatchlistPanel({ watchlist, onRemove, onClear }) {
  return (
    <div className="watch-panel">
      <h3>Gösterime Girecekler ({watchlist.length})</h3>

      {watchlist.length === 0 && <div className="muted">Listeye eklenmiş yapım yok.</div>}

      <div className="watch-items">
        {watchlist.map((w) => (
          <div className="watch-item" key={w.id}>
            <div className="thumb">{w.image ? <img src={w.image.medium} alt={w.name} /> : <div className="no-thumb" />}</div>
            <div className="watch-info">
              <div className="watch-title">{w.name}</div>
              <div className="watch-sub muted">{w.language} • ⭐ {w.rating && w.rating.average ? w.rating.average : "—"}</div>
            </div>
            <button className="btn small danger" onClick={() => onRemove(w.id)}>Kaldır</button>
          </div>
        ))}
      </div>
    

      {watchlist.length > 0 && <button className="btn" onClick={onClear}>Listeyi Temizle</button>}
    </div>
  );
}

