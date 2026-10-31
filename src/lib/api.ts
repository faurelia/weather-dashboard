import { currentWeatherSchema } from "../lib/current-weather.schema";
import { forecastWeatherSchema } from "./forecast-weather.schema";
import { groupForecastByDate } from "./group-forecast";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getCurrentWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=51&lon=-0.12&units=metric&appid=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch current weather data");
  }
  const data: unknown = await response.json();

  return currentWeatherSchema.parse(data);
};

export const getForecastWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=51&lon=-0.12&units=metric&appid=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch forecast weather data");
  }
  const json: unknown = await response.json();

  const data = forecastWeatherSchema.parse(json);

  console.log(data);

  return {
    city: data.city,
    days: groupForecastByDate(data.list),
  };
};
