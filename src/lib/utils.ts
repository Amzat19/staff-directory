import { CityData } from "@/types";

export const generateAvatar = (name: string): string => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
};

export const getUniqueCountries = (cities: CityData[]): string[] => {
  const countries = new Set(cities.map((c) => c.country));
  return Array.from(countries).sort();
};

export const getStatesByCountry = (
  cities: CityData[],
  country: string,
): string[] => {
  const states = new Set(
    cities.filter((c) => c.country === country).map((c) => c.subcountry),
  );
  return Array.from(states).sort();
};
