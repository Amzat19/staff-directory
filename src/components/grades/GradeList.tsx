"use client";

import { GraduationCap } from "lucide-react";
import { GradeLevel, Employee } from "@/types";
import GradeCard from "./GradeCard";

interface GradeListProps {
  gradeLevels: GradeLevel[];
  employees: Employee[];
  onDelete: (id: string) => void;
}

export default function GradeList({
  gradeLevels,
  employees,
  onDelete,
}: GradeListProps) {
  if (gradeLevels.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
        <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500">No grade levels created yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {gradeLevels.map((grade) => {
        const count = employees.filter(
          (e) => e.gradeLevelId === grade.id,
        ).length;
        return (
          <GradeCard
            key={grade.id}
            grade={grade}
            employeeCount={count}
            totalEmployees={employees.length}
            onDelete={() => onDelete(grade.id)}
          />
        );
      })}
    </div>
  );
}
