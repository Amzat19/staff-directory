"use client";

import { Users } from "lucide-react";
import { Employee, GradeLevel } from "@/types";
import EmployeeCard from "./EmployeeCard";

interface EmployeeGridProps {
  employees: Employee[];
  gradeLevels: GradeLevel[];
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeGrid({
  employees,
  gradeLevels,
  onView,
  onEdit,
  onDelete,
}: EmployeeGridProps) {
  const getGradeName = (id: string | null) => {
    if (!id) return "Unassigned";
    return gradeLevels.find((g) => g.id === id)?.name || "Unknown";
  };

  if (employees.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
        <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900">
          No employees found
        </h3>
        <p className="text-slate-500">
          Try adjusting your search or add a new employee.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          gradeName={getGradeName(employee.gradeLevelId)}
          onView={() => onView(employee)}
          onEdit={() => onEdit(employee)}
          onDelete={() => onDelete(employee.id)}
        />
      ))}
    </div>
  );
}
