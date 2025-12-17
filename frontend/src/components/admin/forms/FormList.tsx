"use client";

import React from "react";
import type { ApplyFormItem } from "@/types/applyForm";

interface Props {
  forms: ApplyFormItem[];
  loading?: boolean;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:5000";

// Date formatting helper
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Stage badge
const getStageBadge = (stage: string) => {
  let color = "bg-gray-200 text-gray-800";
  if (stage.toLowerCase().includes("seed")) color = "bg-blue-100 text-blue-800";
  else if (stage.toLowerCase().includes("pre-seed"))
    color = "bg-indigo-100 text-indigo-800";
  else if (stage.toLowerCase().includes("series"))
    color = "bg-green-100 text-green-800";
  else if (stage.toLowerCase().includes("idea"))
    color = "bg-yellow-100 text-yellow-800";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${color}`}
    >
      {stage}
    </span>
  );
};

export default function FormList({ forms, loading }: Props) {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
        <p className="text-base font-medium text-gray-700">
          Loading applications...
        </p>
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
        <p className="text-base text-gray-500 text-center">
          No applications found.
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Startup Applications ({forms.length})
      </h1>

      {/* Smaller grid & cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {forms.map((f) => (
          <div
            key={f._id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-200"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {f.startupName}
                </h3>
                {getStageBadge(f.stage)}
              </div>

              <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                {f.description || "No description provided."}
              </p>

              <div className="space-y-1 text-xs text-gray-700">
                <p>
                  <span className="font-medium text-gray-900">Founder:</span>{" "}
                  {f.founderName}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Location:</span>{" "}
                  {f.city}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Submitted:</span>{" "}
                  {formatDate(f.createdAt)}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                  Contact & Details
                </p>
                <div className="space-y-1 text-[11px]">
                  {f.website && (
                    <p>
                      <span className="font-medium">Website:</span>{" "}
                      <a
                        href={
                          f.website.startsWith("http")
                            ? f.website
                            : `https://${f.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate"
                      >
                        {f.website}
                      </a>
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    <a
                      href={`mailto:${f.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {f.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">Contact:</span> {f.contact}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span> {f.category}
                  </p>
                  <p>
                    <span className="font-medium">Sectors:</span>{" "}
                    {f.sectors?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Referral:</span>{" "}
                    {f.referral || "None"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-3 border-t border-gray-100 flex justify-end items-center text-xs space-x-3">
              {f.fileUrl ? (
                <a
                  href={`${BASE_URL}/${f.fileUrl.replace(/^\//, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  View Pitch Deck
                </a>
              ) : (
                <span className="text-gray-400">No Pitch Deck</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
