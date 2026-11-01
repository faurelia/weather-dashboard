import { Suspense, useEffect, useRef, useState } from "react";
import { CurrentWeather } from "./current-weather";
import { Forecast } from "./forecast";
import { SearchInput } from "./search-input";
import { geocodeCity, type Coordinates } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const DEFAULT_COORDINATES: Coordinates = {
  lat: 35.6762,
  lon: 139.6503,
}; // Tokyo, Japan

export function WeatherDashboard() {
  const [coordinates, setCoordinates] =
    useState<Coordinates>(DEFAULT_COORDINATES);

  const hasSearched = useRef(false);

  const { mutate, error } = useMutation({
    mutationFn: geocodeCity,
    onSuccess: (data) => {
      setCoordinates({ lat: data.lat, lon: data.lon });
    },
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // prevent search override of geolocation coordinates on initial load
        if (hasSearched.current) return;

        setCoordinates({
          lat: coords.latitude,
          lon: coords.longitude,
        });
      },
      () => {},
      {
        enableHighAccuracy: false,
        timeout: 10_000,
        maximumAge: 300_000,
      },
    );
  }, []);

  return (
    <main className="max-w-6xl mx-auto py-8 flex flex-col gap-8">
      <SearchInput
        onSearch={(city) => {
          hasSearched.current = true;
          mutate(city);
        }}
      />

      {error && <p className="text-destructive">{error.message}</p>}

      <Suspense fallback={<div>Loading current weather...</div>}>
        <CurrentWeather coordinates={coordinates} />
      </Suspense>
      <Suspense fallback={<div>Loading forecast weather...</div>}>
        <Forecast coordinates={coordinates} />
      </Suspense>
    </main>
  );
}
