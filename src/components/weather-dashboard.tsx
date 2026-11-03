import { Suspense, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SearchInput } from "@/components/search-input";
import { CurrentWeather } from "@/components/current-weather";
import { CurrentWeatherSkeleton } from "@/components/current-weather-skeleton";
import { AirPollution } from "@/components/air-pollution";
import { AirPollutionSkeleton } from "@/components/air-pollution-skeleton";
import { Forecast } from "@/components/forecast";
import { ForecastSkeleton } from "@/components/forecast-skeleton";
import { WeatherMap } from "@/components/weather-map";
import { geocodeCity, type Coordinates } from "@/lib/api";
import { Header } from "@/components/header";

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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8">
      <Header />
      <main className="flex flex-col gap-6">
        <SearchInput
          onSearch={(city) => {
            hasSearched.current = true;
            mutate(city);
          }}
        />
        {error && <p className="text-destructive">{error.message}</p>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Suspense fallback={<CurrentWeatherSkeleton />}>
            <CurrentWeather coordinates={coordinates} />
          </Suspense>
          <div className="md:col-span-2 min-h-110">
            <WeatherMap
              coordinates={coordinates}
              onCoordinatesChange={setCoordinates}
            />
          </div>
        </div>
        <Suspense fallback={<AirPollutionSkeleton />}>
          <AirPollution coordinates={coordinates} />
        </Suspense>
        <Suspense fallback={<ForecastSkeleton />}>
          <Forecast coordinates={coordinates} />
        </Suspense>
      </main>
    </div>
  );
}
