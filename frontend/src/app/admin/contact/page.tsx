"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchAllContacts, ContactItem } from "@/services/contact.service";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContacts() {
      try {
        setLoading(true);
        const res = await fetchAllContacts();
        setContacts(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
        setError("Failed to load contacts. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    if (!searchTerm) {
      return contacts;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerCaseSearch) ||
        contact.email.toLowerCase().includes(lowerCaseSearch) ||
        contact.subject.toLowerCase().includes(lowerCaseSearch) ||
        contact.message.toLowerCase().includes(lowerCaseSearch)
    );
  }, [contacts, searchTerm]);

  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);

  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredContacts.slice(startIndex, endIndex);
  }, [filteredContacts, currentPage]);

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="p-2 border rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors bg-white shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-4 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => setCurrentPage(page as number)}
              className={`px-4 py-2 rounded-full font-medium transition-colors text-sm ${currentPage === page
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors bg-white shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">Contact Messages
      </h1>

      <div className="flex items-center mt-4 mb-4 bg-white p-3 rounded-lg shadow border">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search by Name, Email, Subject, or Message..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-grow text-gray-700 focus:outline-none"
        />
        <span className="text-sm text-gray-500 ml-4 hidden sm:inline">
          Results: {filteredContacts.length}
        </span>
      </div>

      {loading && (
        <div className="text-center p-10 text-xl text-blue-600">Loading contacts...</div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!loading && !error && filteredContacts.length === 0 && (
        <div className="text-center p-10 text-xl text-gray-500 border rounded-lg bg-white shadow">
          {searchTerm ? "No contacts found matching your search criteria." : "No contact messages available."}
        </div>
      )}

      {!loading && !error && filteredContacts.length > 0 && (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 hidden md:table-header-group">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/5">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-2/5">
                    Message Snippet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedContacts.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } md:table-row block mb-4 md:mb-0 p-4 md:p-0 border border-gray-200 md:border-none rounded-lg`}
                  >
                    <td className="p-2 md:py-4 md:px-6 whitespace-nowrap block md:table-cell text-sm text-gray-800" data-label="Name:">
                      <span className="md:hidden font-bold text-gray-600 mr-2">Name:</span>
                      {item.name}
                    </td>
                    <td className="p-2 md:py-4 md:px-6 whitespace-nowrap block md:table-cell text-sm text-blue-600" data-label="Email:">
                      <span className="md:hidden font-bold text-gray-600 mr-2">Email:</span>
                      {item.email}
                    </td>
                    <td className="p-2 md:py-4 md:px-6 block md:table-cell text-sm text-gray-800 font-medium" data-label="Subject:">
                      <span className="md:hidden font-bold text-gray-600 mr-2">Subject:</span>
                      <span className="truncate block">{item.subject}</span>
                    </td>
                    <td className="p-2 md:py-4 md:px-6 block md:table-cell text-sm text-gray-600" data-label="Message:">
                      <span className="md:hidden font-bold text-gray-600 mr-2">Message:</span>
                      <span className="line-clamp-2 md:line-clamp-1 block">{item.message}</span>
                    </td>
                    <td className="p-2 md:py-4 md:px-6 whitespace-nowrap block md:table-cell text-xs text-gray-500" data-label="Date:">
                      <span className="md:hidden font-bold text-gray-600 mr-2">Date:</span>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && filteredContacts.length > 0 && renderPagination()}
    </div>
  );
}