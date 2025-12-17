// components/admin/charts/YearlyBarChart.tsx
"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { ApplyFormItem } from "@/types/applyForm";

interface Props {
  forms: ApplyFormItem[];
}

export default function YearlyBarChart({ forms }: Props) {
  const map = forms.reduce<Record<number, number>>((acc, f) => {
    const year = new Date(f.createdAt).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(map)
    .map((k) => ({ year: Number(k), applications: map[Number(k)] }))
    .sort((a, b) => a.year - b.year);

  if (data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow min-h-[220px]">
        <h3 className="font-semibold mb-2">Applications Per Year</h3>
        <p className="text-sm text-gray-500">No data</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-2">Applications Per Year</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="applications" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
