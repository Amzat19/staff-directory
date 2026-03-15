"use client";

import { useState, useEffect } from "react";
import { CityData } from "@/types";

interface UseCitiesReturn {
  cities: CityData[];
  isLoading: boolean;
  error: Error | null;
}

export function useCities(): UseCitiesReturn {
  const [cities, setCities] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch(
      "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json",
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cities");
        return res.json();
      })
      .then((data: CityData[]) => {
        if (isMounted) {
          setCities(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { cities, isLoading, error };
}
