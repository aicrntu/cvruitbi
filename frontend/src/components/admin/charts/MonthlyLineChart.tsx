// components/admin/charts/MonthlyLineChart.tsx
"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { ApplyFormItem } from "@/types/applyForm";

interface Props {
  forms: ApplyFormItem[];
}

export default function MonthlyLineChart({ forms }: Props) {
  // Group by YYYY-MM
  const map = forms.reduce<Record<string, number>>((acc, f) => {
    const dt = new Date(f.createdAt);
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(map)
    .sort()
    .map((k) => ({ month: k, applications: map[k] }));

  if (data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow min-h-[220px]">
        <h3 className="font-semibold mb-2">Monthly Growth</h3>
        <p className="text-sm text-gray-500">No data</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-2">Monthly Growth</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="applications" stroke="#F97316" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
