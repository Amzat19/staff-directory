"use client";

import { useState, useMemo } from "react";
import { Employee, GradeLevel } from "@/types";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeGrid from "./EmployeeGrid";

interface EmployeeTabProps {
  employees: Employee[];
  gradeLevels: GradeLevel[];
  onAdd: () => void;
  onEdit: (employee: Employee) => void;
  onView: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeTab({
  employees,
  gradeLevels,
  onAdd,
  onEdit,
  onView,
  onDelete,
}: EmployeeTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>("all");

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGrade =
        selectedGradeFilter === "all" ||
        (selectedGradeFilter === "unassigned"
          ? !emp.gradeLevelId
          : emp.gradeLevelId === selectedGradeFilter);
      return matchesSearch && matchesGrade;
    });
  }, [employees, searchQuery, selectedGradeFilter]);

  return (
    <div className="space-y-6">
      <EmployeeFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGrade={selectedGradeFilter}
        onGradeChange={setSelectedGradeFilter}
        gradeLevels={gradeLevels}
        onAddClick={onAdd}
      />
      <EmployeeGrid
        employees={filteredEmployees}
        gradeLevels={gradeLevels}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
