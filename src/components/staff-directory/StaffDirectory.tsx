"use client";

import { useState, useCallback } from "react";
import { Employee, GradeLevel, ModalMode } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCities } from "@/hooks/useCities";
import { generateAvatar } from "@/lib/utils";
import Header from "@/components/ui/Header";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmployeeTab from "@/components/employees/EmployeeTab";
import GradeTab from "@/components/grades/GradeTab";
import EmployeeModal from "../modal/EmployeeModal";
import GradeModal from "../modal/GradeModal";

export default function StaffDirectory() {
  // Data persistence
  const [employees, setEmployees] = useLocalStorage<Employee[]>(
    "staff_directory_employees",
    [],
  );
  const [gradeLevels, setGradeLevels] = useLocalStorage<GradeLevel[]>(
    "staff_directory_grades",
    [],
  );

  // External data
  const { cities, isLoading } = useCities();

  // UI State
  const [activeTab, setActiveTab] = useState<"employees" | "grades">(
    "employees",
  );

  // Modal State
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [employeeModalMode, setEmployeeModalMode] =
    useState<ModalMode>("create");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  // Employee Handlers
  const handleOpenEmployeeModal = useCallback(
    (mode: ModalMode, employee?: Employee) => {
      setEmployeeModalMode(mode);
      if (employee) {
        setSelectedEmployee(employee);
        setFormData({ ...employee });
      } else {
        setSelectedEmployee(null);
        setFormData({
          name: "",
          country: "",
          state: "",
          address: "",
          role: "",
          department: "",
          gradeLevelId: null,
        });
      }
      setIsEmployeeModalOpen(true);
    },
    [],
  );

  const handleSaveEmployee = useCallback(() => {
    if (!formData.name || !formData.country || !formData.role) return;

    if (employeeModalMode === "create") {
      const newEmployee: Employee = {
        id: Date.now().toString(),
        name: formData.name,
        country: formData.country,
        state: formData.state || "",
        address: formData.address || "",
        role: formData.role,
        department: formData.department || "",
        gradeLevelId: formData.gradeLevelId || null,
        avatar: generateAvatar(formData.name),
      };
      setEmployees((prev) => [...prev, newEmployee]);
    } else if (employeeModalMode === "edit" && selectedEmployee) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployee.id
            ? ({ ...emp, ...formData } as Employee)
            : emp,
        ),
      );
    }
    setIsEmployeeModalOpen(false);
  }, [formData, employeeModalMode, selectedEmployee, setEmployees]);

  const handleDeleteEmployee = useCallback(
    (id: string) => {
      if (confirm("Are you sure you want to delete this employee?")) {
        setEmployees((prev) => prev.filter((e) => e.id !== id));
      }
    },
    [setEmployees],
  );

  // Grade Handlers
  const handleAddGrade = useCallback(
    (name: string) => {
      const newGrade: GradeLevel = {
        id: Date.now().toString(),
        name: name.toUpperCase(),
        description: "",
      };
      setGradeLevels((prev) => [...prev, newGrade]);
    },
    [setGradeLevels],
  );

  const handleDeleteGrade = useCallback(
    (id: string) => {
      if (
        confirm(
          "Deleting this grade will unassign all employees currently in it. Continue?",
        )
      ) {
        setGradeLevels((prev) => prev.filter((g) => g.id !== id));
        setEmployees((prev) =>
          prev.map((e) =>
            e.gradeLevelId === id ? { ...e, gradeLevelId: null } : e,
          ),
        );
      }
    },
    [setGradeLevels, setEmployees],
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "employees" ? (
          <EmployeeTab
            employees={employees}
            gradeLevels={gradeLevels}
            onAdd={() => handleOpenEmployeeModal("create")}
            onEdit={(emp) => handleOpenEmployeeModal("edit", emp)}
            onView={(emp) => handleOpenEmployeeModal("view", emp)}
            onDelete={handleDeleteEmployee}
          />
        ) : (
          <GradeTab
            gradeLevels={gradeLevels}
            employees={employees}
            onAdd={() => setIsGradeModalOpen(true)}
            onDelete={handleDeleteGrade}
          />
        )}
      </main>

      <EmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        mode={employeeModalMode}
        employee={selectedEmployee}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveEmployee}
        gradeLevels={gradeLevels}
        cities={cities}
      />

      <GradeModal
        isOpen={isGradeModalOpen}
        onClose={() => setIsGradeModalOpen(false)}
        onSubmit={handleAddGrade}
      />
    </div>
  );
}
