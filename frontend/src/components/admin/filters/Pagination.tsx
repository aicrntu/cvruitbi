// components/admin/filters/Pagination.tsx
"use client";

import React from "react";

interface Props {
  total: number;
  page: number;
  setPage: (p: number) => void;
  pageSize: number;
}

export default function Pagination({ total, page, setPage, pageSize }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);

  if (totalPages === 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 border rounded ${p === page ? "bg-blue-600 text-white" : ""}`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
