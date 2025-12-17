"use client";

import React from "react";
import type { ApplyFormItem } from "@/types/applyForm";

// Full CSV generator
function toCSV(rows: Record<string, any>[]) {
  if (!rows.length) return "";

  const keys = Object.keys(rows[0]);
  const header = keys.join(",");
  const values = rows.map((row) =>
    keys
      .map((key) => {
        let val = row[key];
        if (val === null || val === undefined) return "";
        if (Array.isArray(val)) val = val.join("; ");
        val = String(val).replace(/"/g, '""');
        return `"${val}"`;
      })
      .join(",")
  );

  return [header, ...values].join("\n");
}

interface Props {
  forms: ApplyFormItem[];
}

export default function ExportButtons({ forms }: Props) {
  // 🔽 Build FULL export rows
  const buildRows = () => {
    return forms.map((f) => ({
      ID: f._id,
      Startup: f.startupName,
      Founder: f.founderName,
      Email: f.email,
      Contact: f.contact,
      City: f.city,
      Stage: f.stage,
      Category: f.category,
      Sectors: f.sectors?.join("; "),
      Website: f.website,
      Description: f.description,
      Referral: f.referral,
      FileURL: f.fileUrl,
      CreatedAt: f.createdAt,
    }));
  };

  const handleCSV = () => {
    const csv = toCSV(buildRows());
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `apply_forms_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const handleJSON = () => {
    const blob = new Blob([JSON.stringify(buildRows(), null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `apply_forms_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleXLSX = async () => {
    try {
      const [{ utils, writeFile }] = await Promise.all([import("xlsx")]);

      const sheetData = [
        Object.keys(buildRows()[0]),
        ...buildRows().map((row) => Object.values(row)),
      ];

      const ws = utils.aoa_to_sheet(sheetData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Applications");

      writeFile(wb, `apply_forms_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (err) {
      console.error("XLSX export error:", err);
      alert("Install `xlsx` package to enable Excel export.");
    }
  };

  return (
    <div className="flex gap-1 text-[10px]">
      <button
        className="px-2 py-1 bg-slate-700 text-white rounded shadow-sm hover:bg-slate-800 transition"
        onClick={handleCSV}
      >
        CSV
      </button>

      <button
        className="px-2 py-1 bg-amber-600 text-white rounded shadow-sm hover:bg-amber-700 transition"
        onClick={handleXLSX}
      >
        XLSX
      </button>

      <button
        className="px-2 py-1 border rounded shadow-sm hover:bg-gray-100 transition"
        onClick={handleJSON}
      >
        JSON
      </button>
    </div>
  );
}
    