"use client";

import { Users } from "lucide-react";

interface HeaderProps {
  activeTab: "employees" | "grades";
  onTabChange: (tab: "employees" | "grades") => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Users className="w-3 h-3 lg:w-6 lg:h-6 text-white" />
            </div>
            <h1 className="text-xs lg:text-xl font-bold text-slate-900">
              Staff Directory
            </h1>
          </div>

          <nav className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            <TabButton
              active={activeTab === "employees"}
              onClick={() => onTabChange("employees")}
              label="Employees"
            />
            <TabButton
              active={activeTab === "grades"}
              onClick={() => onTabChange("grades")}
              label="Grade Levels"
            />
          </nav>
        </div>
      </div>
    </header>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 lg:px-4 lg:py-2 rounded-md text-sm font-medium transition-all ${
        active
          ? "bg-white text-indigo-600 shadow-sm"
          : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {label}
    </button>
  );
}
