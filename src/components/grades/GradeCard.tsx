"use client";

import { Trash2 } from "lucide-react";
import { GradeLevel } from "@/types";

interface GradeCardProps {
  grade: GradeLevel;
  employeeCount: number;
  totalEmployees: number;
  onDelete: () => void;
}

export default function GradeCard({
  grade,
  employeeCount,
  totalEmployees,
  onDelete,
}: GradeCardProps) {
  const percentage =
    totalEmployees > 0 ? (employeeCount / totalEmployees) * 100 : 0;

  return (
    <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-slate-900">{grade.name}</h3>
        <button
          onClick={onDelete}
          className="text-slate-400 hover:text-red-600 p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        {employeeCount} employee{employeeCount !== 1 ? "s" : ""}
      </p>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
