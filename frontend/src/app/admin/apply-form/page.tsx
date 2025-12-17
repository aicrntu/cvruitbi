"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchAllApplyForms, ApplyFormItem } from "@/services/applyForm.service";
import ApplyFormTable from "@/components/admin/apply-forms/ApplyFormTable";
import ExportExcelButton from "@/components/admin/apply-forms/ExportExcelButton";
import { Search } from "lucide-react";

export default function AdminApplyForms() {
    const [forms, setForms] = useState<ApplyFormItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    useEffect(() => {
        fetchAllApplyForms().then((res) => setForms(res.data));
    }, []);

    const filteredForms = useMemo(() => {
        const lower = searchTerm.toLowerCase();

        return forms.filter((f) => {
            const name = f.startupName?.toLowerCase() || "";
            const founder = f.founderName?.toLowerCase() || "";
            const email = f.email?.toLowerCase() || "";
            const stage = f.stage?.toLowerCase() || "";
            const city = f.city?.toLowerCase() || "";
            const category = f.category?.toLowerCase() || "";
            const sectors = Array.isArray(f.sectors)
                ? f.sectors.join(" ").toLowerCase()
                : "";

            return (
                name.includes(lower) ||
                founder.includes(lower) ||
                email.includes(lower) ||
                stage.includes(lower) ||
                city.includes(lower) ||
                category.includes(lower) ||
                sectors.includes(lower)
            );
        });
    }, [forms, searchTerm]);


    return (
        <div className="p-4 md:p-6 transition-all duration-300">

            {/* Header Row */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Startup Applications</h1>
                <ExportExcelButton data={filteredForms} />
            </div>

            {/* Search */}
            <div className="flex items-center mt-4 mb-4 bg-white p-3 rounded-lg shadow border">
                <Search size={16} className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search startups..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow text-sm outline-none"
                />
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <ApplyFormTable
                    forms={filteredForms}
                    expandedRowId={expandedRowId}
                    setExpandedRowId={setExpandedRowId}
                />
            </div>
        </div>
    );
}
