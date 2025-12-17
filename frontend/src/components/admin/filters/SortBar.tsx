"use client";

import React from "react";

interface Props {
  sortOrder: "newest" | "oldest";
  setSortOrder: (s: "newest" | "oldest") => void;
}

export default function SortBar({ sortOrder, setSortOrder }: Props) {
  return (
    <div className="text-[10px] flex items-center gap-2 ">
      <div className="text-[10px] text-gray-600">Sort by</div>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
        className="border p-1 rounded text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
}
