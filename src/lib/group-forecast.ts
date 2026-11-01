import type { ForecastItem } from "./forecast-weather.schema";

export type DailyForecast = {
  date: string;
  forecasts: ForecastItem[];
  minTemp: number;
  maxTemp: number;
};

export function groupForecastByDate(
  forecasts: ForecastItem[],
): DailyForecast[] {
  const grouped = new Map<string, ForecastItem[]>();

  for (const forecast of forecasts) {
    const date = forecast.dt_txt.split(" ")[0];

    const existing = grouped.get(date);

    if (existing) {
      existing.push(forecast);
    } else {
      grouped.set(date, [forecast]);
    }
  }

  return Array.from(grouped, ([date, forecasts]) => {
    const temperatures = forecasts.map((f) => f.main.temp);

    return {
      date,
      forecasts,
      minTemp: Math.min(...temperatures),
      maxTemp: Math.max(...temperatures),
    };
  });
}
