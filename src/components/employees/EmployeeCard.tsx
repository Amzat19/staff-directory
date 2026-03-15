"use client";

import { Edit2, Trash2, Users, Building2, MapPin, Award } from "lucide-react";
import { Employee } from "@/types";
import { generateAvatar } from "@/lib/utils";
import Image from "next/image";

interface EmployeeCardProps {
  employee: Employee;
  gradeName: string;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EmployeeCard({
  employee,
  gradeName,
  onView,
  onEdit,
  onDelete,
}: EmployeeCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <Image
            width={64}
            height={64}
            src={employee.avatar || generateAvatar(employee.name)}
            alt={employee.name}
            className="w-16 h-16 rounded-full bg-slate-100 border-2 border-white shadow-sm"
          />
          <div>
            <h3 className="font-bold text-slate-900">{employee.name}</h3>
            <p className="text-sm text-indigo-600 font-medium">
              {employee.role}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <ActionButton
            onClick={onView}
            icon={<Users className="w-4 h-4" />}
            title="View Profile"
            color="indigo"
          />
          <ActionButton
            onClick={onEdit}
            icon={<Edit2 className="w-4 h-4" />}
            title="Edit"
            color="indigo"
          />
          <ActionButton
            onClick={onDelete}
            icon={<Trash2 className="w-4 h-4" />}
            title="Delete"
            color="red"
          />
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <InfoRow
          icon={<Building2 className="w-4 h-4 text-slate-400" />}
          text={employee.department || "No department"}
        />
        <InfoRow
          icon={<MapPin className="w-4 h-4 text-slate-400" />}
          text={
            employee.state
              ? `${employee.state}, ${employee.country}`
              : employee.country
          }
        />
        {employee.gradeLevelId && (
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-xs">
              {gradeName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  onClick,
  icon,
  title,
  color,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  color: "indigo" | "red";
}) {
  const colorClasses =
    color === "indigo"
      ? "hover:text-indigo-600 hover:bg-indigo-50"
      : "hover:text-red-600 hover:bg-red-50";

  return (
    <button
      onClick={onClick}
      className={`p-2 text-slate-400 ${colorClasses} rounded-lg transition-colors`}
      title={title}
    >
      {icon}
    </button>
  );
}

function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      {icon}
      <span>{text}</span>
    </div>
  );
}
