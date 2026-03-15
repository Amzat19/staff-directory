export interface Employee {
  id: string;
  name: string;
  country: string;
  state: string;
  address: string;
  role: string;
  department: string;
  gradeLevelId: string | null;
  avatar?: string;
}

export interface GradeLevel {
  id: string;
  name: string;
  description?: string;
}

export interface CityData {
  country: string;
  name: string;
  subcountry: string;
  geonameid?: number;
}

export type ModalMode = "create" | "edit" | "view";
