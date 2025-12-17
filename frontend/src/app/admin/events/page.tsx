"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit,
  X,
  Calendar,
} from "lucide-react";

interface Event {
  _id: string;
  event_name: string;
  event_desc: string;
}

interface ApiResponse {
  success: boolean;
  data: Event[];
  totalPages: number;
  currentPage: number;
  total: number;
}

const EVENTS_PER_PAGE = 8;

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchEvents = useCallback(
    async (page: number, search: string, from: string, to: string) => {
      setLoading(true);
      try {
        const res = await api.get<ApiResponse>("/events", {
          params: {
            page,
            limit: EVENTS_PER_PAGE,
            search,
            from,
            to,
          },
        });

        setEvents(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        setCurrentPage(res.data.currentPage || page);
      } catch (err) {
        console.error("Error fetching events", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch whenever page / search / date changes
  useEffect(() => {
    fetchEvents(currentPage, searchTerm, fromDate, toDate);
  }, [currentPage, searchTerm, fromDate, toDate, fetchEvents]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page for new search
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
    setCurrentPage(1);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const clearDate = () => {
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <ProtectedRoute>
      <div className="bg-white min-h-screen p-6">
        {/* scale down whole UI */}
        <div className="origin-top">
          {/* Header */}
          <header className="flex justify-between items-center mb-6 border-b pb-3">
            <h1 className="text-3xl font-bold text-[#002b5b]">
              Event Management
            </h1>

            <Link href="/admin/events/create">
              <button className="flex items-center bg-[#003f8c] text-white px-5 py-2 rounded shadow hover:bg-[#002b5b]">
                <Plus className="w-4 h-4 mr-1" />
                Create
              </button>
            </Link>
          </header>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search by event name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-9 py-2 border border-[#003f8c] rounded focus:outline-none"
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 text-gray-500" />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Date Filter */}
            
            {/* From Date */}
            <div className="relative max-w-xs w-full">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-9 pr-8 py-2 border border-[#003f8c] rounded focus:outline-none"
              />
              <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 text-gray-500" />
              {fromDate && (
                <button
                  onClick={() => setFromDate("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* To Date */}
            <div className="relative max-w-xs w-full">
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-9 pr-8 py-2 border border-[#003f8c] rounded focus:outline-none"
              />
              <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 text-gray-500" />
              {toDate && (
                <button
                  onClick={() => setToDate("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Events Grid */}
          {loading ? (
            <p className="text-center text-[#002b5b]">Loading...</p>
          ) : events.length === 0 ? (
            <p className="text-center italic text-gray-500">No events found</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {events.map((e) => (
                <div
                  key={e._id}
                  className="bg-white border border-[#003f8c] rounded-lg p-4 shadow"
                >
                  <h2 className="text-lg font-semibold text-[#003f8c] truncate">
                    {e.event_name}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3 mt-1">
                    {e.event_desc}
                  </p>

                  <Link href={`/admin/events/edit/${e._id}`}>
                    <button className="mt-3 bg-[#003f8c] text-white px-3 py-1 text-xs rounded hover:bg-[#002b5b]">
                      <Edit className="w-3 h-3 inline mr-1" />
                      Edit
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="text-[#003f8c]" />
              </button>

              <span className="text-[#003f8c] text-sm">
                Page {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight className="text-[#003f8c]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
