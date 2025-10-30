import React from "react";
import TVCard from "./TVCard";

export default function TVList({ shows, isLoading, isError, onAdd, onRemove, watchlistIds }) {
  if (isLoading) return <div className="state-box">Yükleniyor... <div className="spinner" /></div>;
  if (isError) return <div className="state-box error">Hata oluştu. <button onClick={() => window.location.reload()}>Tekrar dene</button></div>;
  if (!shows || shows.length === 0) return <div className="state-box">Sonuç yok.</div>;

  return (
    <div className="tvlist-grid">
      {shows.map((s) => (
        <TVCard
          key={s.id}
          show={s}
          onAdd={onAdd}
          onRemove={onRemove}
          isInWatchlist={watchlistIds.includes(s.id)}
        />
        
      ))}
    </div>
  );
  
}
