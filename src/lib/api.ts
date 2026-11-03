import { airPollutionSchema } from "@/lib/air-pollution.schema";
import { groupForecastByDate } from "@/lib/group-forecast";
import {
  currentWeatherSchema,
  forecastSchema,
  geocodingSchema,
} from "@/lib/weather.schema";
import z from "zod";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export type Coordinates = {
  lat: number;
  lon: number;
};

export const getCurrentWeather = async ({ lat, lon }: Coordinates) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch current weather data");
  }
  const data: unknown = await response.json();

  return currentWeatherSchema.parse(data);
};

export const getForecast = async ({ lat, lon }: Coordinates) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch forecast weather data: ${response.status}`,
    );
  }

  const json: unknown = await response.json();

  const result = forecastSchema.safeParse(json);

  if (!result.success) {
    console.error(z.prettifyError(result.error));
    throw new Error("Invalid forecast API response");
  }

  return {
    city: result.data.city,
    days: groupForecastByDate(result.data.list),
  };
};

export const geocodeCity = async (city: string) => {
  const params = new URLSearchParams({
    q: city,
    limit: "5",
    appid: API_KEY,
  });

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?${params.toString()}`,
  );
  if (!response.ok) {
    throw new Error("Failed to find specified data");
  }

  const data = geocodingSchema.parse(await response.json());

  if (!data.length) {
    throw new Error("City not found.");
  }

  return data[0];
};

export const getAirPollution = async ({ lat, lon }: Coordinates) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch air pollution data: ${response.status} ${response.statusText}`,
    );
  }

  const data = airPollutionSchema.safeParse(await response.json());

  if (!data.success) {
    console.error(z.prettifyError(data.error));
    throw new Error("Invalid air pollution API response");
  }

  const pollution = data.data.list[0];

  if (!pollution) {
    throw new Error("No air pollution data available for these coordinates");
  }

  return pollution;
};
