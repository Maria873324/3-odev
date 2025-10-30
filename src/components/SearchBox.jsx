import React, { useState, useEffect } from "react";


export default function SearchBox({ query, onSearch }) {
  const [q, setQ] = useState(query || "");

  useEffect(() => setQ(query || ""), [query]);

  return (
    <div className="searchbox">
      <input
        placeholder="Dizi ara... (örn: friends)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(q);
        }}
      />
      <button onClick={() => onSearch(q)}>Ara</button>
      <button
        onClick={() => {
          setQ("");
          onSearch("");
        }}
        className="muted"
      >
        Sıfırla
      </button>
    </div>
  );
}
