"use client";

import React, { useEffect, useMemo, useState } from "react";
import FilterBar from "@/components/admin/filters/FilterBar"; 
import Pagination from "@/components/admin/filters/Pagination";

import StagePieChart from "@/components/admin/charts/StagePieChart";
import YearlyBarChart from "@/components/admin/charts/YearlyBarChart";
import SectorPieChart from "@/components/admin/charts/SectorPieChart";
import CityBarChart from "@/components/admin/charts/CityBarChart";
import MonthlyLineChart from "@/components/admin/charts/MonthlyLineChart";

import ExportButtons from "@/components/admin/forms/ExportButtons";
import FormList from "@/components/admin/forms/FormList";

import type { ApplyFormItem } from "@/types/applyForm";
import { fetchAllApplyForms } from "@/services/applyForm.service";

export default function AdminDashboard() {
  const [forms, setForms] = useState<ApplyFormItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [stage, setStage] = useState<string | undefined>();
  const [year, setYear] = useState<string | undefined>();
  const [search, setSearch] = useState<string>("");

  // Sorting (moved to FilterBar)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Pagination
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  // Load when stage/year changes
  useEffect(() => {
    loadAllForms();
    setPage(1);
  }, [stage, year]);

  async function loadAllForms() {
    setLoading(true);
    try {
      const res = await fetchAllApplyForms(stage, year);
      setForms(res.data ?? []);
    } catch (err) {
      console.error("Failed to load forms", err);
      setForms([]);
    } finally {
      setLoading(false);
    }
  }

  // Client-side filtering + sorting
  const filteredSorted = useMemo(() => {
    let arr = [...forms];

    const q = search.trim().toLowerCase();
    if (q) {
      arr = arr.filter(
        (f) =>
          f.startupName?.toLowerCase().includes(q) ||
          f.founderName?.toLowerCase().includes(q) ||
          f.email?.toLowerCase().includes(q)
      );
    }

    // Sorting
    arr.sort((a, b) => {
      if (sortOrder === "newest") {
        return +new Date(b.createdAt) - +new Date(a.createdAt);
      }
      return +new Date(a.createdAt) - +new Date(b.createdAt);
    });

    return arr;
  }, [forms, search, sortOrder]);

  const total = filteredSorted.length;

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page]);

  // Ensure valid page after filtering
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(total / pageSize));
    if (page > maxPage) setPage(maxPage);
  }, [total, page]);

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">
            Applications analytics & management
          </p>
        </div>

        <ExportButtons forms={filteredSorted} />
      </header>

      {/* FILTER BAR NOW INCLUDED SORTING */}
      <FilterBar
        stage={stage}
        setStage={setStage}
        year={year}
        setYear={setYear}
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onSearch={() => setPage(1)}
      />

      {/* --- Removed SortBar --- */}

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StagePieChart forms={filteredSorted} />
        <YearlyBarChart forms={filteredSorted} />
        <SectorPieChart forms={filteredSorted} />
        <CityBarChart forms={filteredSorted} />
        <MonthlyLineChart forms={filteredSorted} />
      </div>

      {/* TABLE */}
      <FormList forms={paginated} loading={loading} />

      {/* PAGINATION */}
      <Pagination
        total={total}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
      />
    </div>
  );
}
