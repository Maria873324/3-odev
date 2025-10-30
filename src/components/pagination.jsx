import React from "react";
export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={page === 1}>İlk</button>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>Geri</button>
      <span className="muted">Sayfa {page} / {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>İleri</button>
      <button onClick={() => onPageChange(totalPages)} disabled={page === totalPages}>Son</button>
    </div>
  );
}
