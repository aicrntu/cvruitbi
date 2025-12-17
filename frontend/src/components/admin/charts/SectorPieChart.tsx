"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import type { ApplyFormItem } from "@/types/applyForm";

interface Props {
  forms: ApplyFormItem[];
}

const COLORS = ["#6EE7B7", "#60A5FA", "#F472B6", "#FDBA74", "#C084FC", "#FCA5A5"];

export default function SectorPieChart({ forms }: Props) {
  const counts = forms.reduce<Record<string, number>>((acc, f) => {
    (f.sectors || []).forEach((s) => {
      const key = s || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});

  const entries = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const data = entries.map(([name, value]) => ({
    name,
    display: name.length > 14 ? name.slice(0, 14) + "…" : name, // slight increase before truncating
    value
  }));

  if (data.length === 0) {
    return (
      <div className="bg-white p-3 rounded-lg shadow min-h-[170px] flex flex-col justify-center">
        <h3 className="font-semibold mb-1">Top Sectors</h3>
        <p className="text-[11px] text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded-lg shadow">
      <h3 className="font-semibold mb-1">Top Sectors</h3>

      <div style={{ width: "100%", height: 210 }}>  {/* ⭐ 20% larger height */}
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="display"
              outerRadius={72}  
              paddingAngle={2}
              label={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                fontSize: "11px",   // ⭐ Slightly bigger tooltip
                padding: "6px",
              }}
            />

            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              height={24}          // ⭐ Slightly taller legend
              wrapperStyle={{
                fontSize: "11px",  // ⭐ Larger text
                marginTop: "-4px",
              }}
              formatter={(value) => <span style={{ fontSize: "11px" }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
