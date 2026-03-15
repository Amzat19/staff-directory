"use client";

import { Plus } from "lucide-react";
import { GradeLevel, Employee } from "@/types";
import GradeList from "./GradeList";

interface GradeTabProps {
  gradeLevels: GradeLevel[];
  employees: Employee[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export default function GradeTab({
  gradeLevels,
  employees,
  onAdd,
  onDelete,
}: GradeTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Grade Levels</h2>
            <p className="text-sm text-slate-500">
              Manage organizational hierarchy levels
            </p>
          </div>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Grade
          </button>
        </div>

        <GradeList
          gradeLevels={gradeLevels}
          employees={employees}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
