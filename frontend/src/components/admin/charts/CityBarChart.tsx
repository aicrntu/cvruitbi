// components/admin/charts/CityBarChart.tsx
"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { ApplyFormItem } from "@/types/applyForm";

interface Props {
  forms: ApplyFormItem[];
}

export default function CityBarChart({ forms }: Props) {
  const counts = forms.reduce<Record<string, number>>((acc, f) => {
    const city = f.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(counts)
    .map(([city, value]) => ({ city, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  if (data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow min-h-[220px]">
        <h3 className="font-semibold mb-2">Top Cities</h3>
        <p className="text-sm text-gray-500">No data</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-2">Top Cities</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
