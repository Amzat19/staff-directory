"use client";

import { Search, Filter, Plus } from "lucide-react";
import { GradeLevel } from "@/types";

interface EmployeeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedGrade: string;
  onGradeChange: (value: string) => void;
  gradeLevels: GradeLevel[];
  onAddClick: () => void;
}

export default function EmployeeFilters({
  searchQuery,
  onSearchChange,
  selectedGrade,
  onGradeChange,
  gradeLevels,
  onAddClick,
}: EmployeeFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <SearchInput value={searchQuery} onChange={onSearchChange} />
        <GradeFilter
          value={selectedGrade}
          onChange={onGradeChange}
          gradeLevels={gradeLevels}
        />
      </div>

      <button
        onClick={onAddClick}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors w-full sm:w-auto justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Employee
      </button>
    </div>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder="Search employees..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
      />
    </div>
  );
}

function GradeFilter({
  value,
  onChange,
  gradeLevels,
}: {
  value: string;
  onChange: (value: string) => void;
  gradeLevels: GradeLevel[];
}) {
  return (
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white w-full sm:w-48"
      >
        <option value="all">All Grades</option>
        <option value="unassigned">Unassigned</option>
        {gradeLevels.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
}
