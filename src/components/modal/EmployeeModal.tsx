"use client";

import { useMemo } from "react";
import { X, Save, Building2, MapPin, Award } from "lucide-react";
import { Employee, GradeLevel, CityData, ModalMode } from "@/types";
import { DEPARTMENTS, ROLES } from "@/lib/constants";
import {
  getUniqueCountries,
  getStatesByCountry,
  generateAvatar,
} from "@/lib/utils";
import Image from "next/image";

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  employee: Employee | null;
  formData: Partial<Employee>;
  setFormData: (data: Partial<Employee>) => void;
  onSave: () => void;
  gradeLevels: GradeLevel[];
  cities: CityData[];
}

export default function EmployeeModal({
  isOpen,
  onClose,
  mode,
  employee,
  formData,
  setFormData,
  onSave,
  gradeLevels,
  cities,
}: EmployeeModalProps) {
  const countries = useMemo(() => getUniqueCountries(cities), [cities]);
  const states = useMemo(
    () =>
      formData.country ? getStatesByCountry(cities, formData.country) : [],
    [cities, formData.country],
  );

  const getGradeName = (id: string | null) => {
    if (!id) return "Unassigned";
    return gradeLevels.find((g) => g.id === id)?.name || "Unknown";
  };

  const isViewMode = mode === "view";
  const isEditable = mode === "create" || mode === "edit";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8 animate-in fade-in zoom-in duration-200">
        <Header title={getTitle(mode)} onClose={onClose} />

        <div className="p-6 space-y-6">
          {isViewMode && employee ? (
            <ViewMode
              employee={employee}
              gradeName={getGradeName(employee.gradeLevelId)}
            />
          ) : (
            <EditMode
              formData={formData}
              setFormData={setFormData}
              countries={countries}
              states={states}
              gradeLevels={gradeLevels}
            />
          )}
        </div>

        <Footer
          onClose={onClose}
          onSave={onSave}
          showSave={isEditable}
          canSave={!!formData.name && !!formData.country && !!formData.role}
        />
      </div>
    </div>
  );
}

function getTitle(mode: ModalMode): string {
  switch (mode) {
    case "create":
      return "Add New Employee";
    case "edit":
      return "Edit Employee";
    case "view":
      return "Employee Profile";
  }
}

function Header({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex justify-between items-center p-6 border-b border-slate-100">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
      >
        <X className="w-5 h-5 text-slate-500" />
      </button>
    </div>
  );
}

function ViewMode({
  employee,
  gradeName,
}: {
  employee: Employee;
  gradeName: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Image
          width={96}
          height={96}
          src={employee.avatar || generateAvatar(employee.name)}
          alt={employee.name}
          className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-lg"
        />
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{employee.name}</h3>
          <p className="text-indigo-600 font-medium text-lg">{employee.role}</p>
          {employee.gradeLevelId && (
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 mt-2 w-fit">
              <Award className="w-3 h-3" />
              {gradeName}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl">
        <InfoField
          label="Department"
          icon={<Building2 className="w-4 h-4 text-slate-400" />}
          value={employee.department || "N/A"}
        />
        <InfoField
          label="Location"
          icon={<MapPin className="w-4 h-4 text-slate-400" />}
          value={
            employee.state
              ? `${employee.state}, ${employee.country}`
              : employee.country
          }
        />
        <InfoField
          label="Address"
          value={employee.address || "No address provided"}
          fullWidth
        />
      </div>
    </div>
  );
}

function InfoField({
  label,
  icon,
  value,
  fullWidth,
}: {
  label: string;
  icon?: React.ReactNode;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <p className="mt-1 text-slate-900 font-medium flex items-center gap-2">
        {icon}
        {value}
      </p>
    </div>
  );
}

interface EditModeProps {
  formData: Partial<Employee>;
  setFormData: (data: Partial<Employee>) => void;
  countries: string[];
  states: string[];
  gradeLevels: GradeLevel[];
}

function EditMode({
  formData,
  setFormData,
  countries,
  states,
  gradeLevels,
}: EditModeProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          placeholder="John Doe"
        />
      </div>

      <SelectField
        label="Country *"
        value={formData.country || ""}
        onChange={(value) =>
          setFormData({ ...formData, country: value, state: "" })
        }
        options={countries}
        placeholder="Select Country"
      />

      <SelectField
        label="State/Province"
        value={formData.state || ""}
        onChange={(value) => setFormData({ ...formData, state: value })}
        options={states}
        placeholder="Select State"
        disabled={!formData.country}
      />

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Address
        </label>
        <input
          type="text"
          value={formData.address || ""}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Street address..."
        />
      </div>

      <SelectField
        label="Role *"
        value={formData.role || ""}
        onChange={(value) => setFormData({ ...formData, role: value })}
        options={ROLES}
        placeholder="Select Role"
      />

      <SelectField
        label="Department"
        value={formData.department || ""}
        onChange={(value) => setFormData({ ...formData, department: value })}
        options={DEPARTMENTS}
        placeholder="Select Department"
      />

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Grade Level
        </label>
        <select
          value={formData.gradeLevelId || ""}
          onChange={(e) =>
            setFormData({ ...formData, gradeLevelId: e.target.value || null })
          }
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
        >
          <option value="">Unassigned</option>
          {gradeLevels.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white disabled:bg-slate-50 disabled:text-slate-400"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Footer({
  onClose,
  onSave,
  showSave,
  canSave,
}: {
  onClose: () => void;
  onSave: () => void;
  showSave: boolean;
  canSave: boolean;
}) {
  return (
    <div className="flex justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
      <button
        onClick={onClose}
        className="px-4 py-2 text-slate-700 font-medium hover:bg-slate-200 rounded-lg transition-colors"
      >
        Close
      </button>
      {showSave && (
        <button
          onClick={onSave}
          disabled={!canSave}
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Employee
        </button>
      )}
    </div>
  );
}
