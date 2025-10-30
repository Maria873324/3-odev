import React from "react";

export default function Filters({ filters, setFilters, shows }) {
  const genres = Array.from(new Set((shows || []).flatMap((s) => s.genres || []))).sort();
  const languages = Array.from(new Set((shows || []).map((s) => s.language).filter(Boolean))).sort();

  return (
    <div className="filters">
      <select
        value={filters.genre}
        onChange={(e) => setFilters({ genre: e.target.value })}
      >
        <option value="all">Tür (hepsi)</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        value={filters.language}
        onChange={(e) => setFilters({ language: e.target.value })}
      >
        <option value="all">Dil (hepsi)</option>
        {languages.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <select
        value={filters.minRating}
        onChange={(e) => setFilters({ minRating: Number(e.target.value) })}
      >
        <option value={0}>Min. Puan (0+)</option>
        <option value={3}>3+</option>
        <option value={5}>5+</option>
        <option value={7}>7+</option>
        <option value={8}>8+</option>
      </select>
    </div>
  );
}
