import type { ForecastItem } from "@/lib/weather.schema";

export type DailyForecast = {
  date: string;
  forecasts: ForecastItem[];
  minTemp: number;
  maxTemp: number;
  icon: string;
  description: string;
  condition: string;
};

const dailyDescriptions: Record<string, string> = {
  Clear: "Mostly sunny",
  Clouds: "Mostly cloudy",
  Rain: "Rainy",
  Drizzle: "Drizzly",
  Thunderstorm: "Thunderstorms",
  Snow: "Snowy",
  Mist: "Misty",
  Haze: "Hazy",
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

    const conditionCounts = new Map<string, number>();

    for (const forecast of forecasts) {
      const condition = forecast.weather[0].main;

      conditionCounts.set(condition, (conditionCounts.get(condition) ?? 0) + 1);
    }

    // Find the most frequent condition
    const dominantCondition = [...conditionCounts.entries()].reduce((a, b) =>
      b[1] > a[1] ? b : a,
    )[0];

    const representativeForecast =
      forecasts.find(
        (f) => f.weather[0].main === dominantCondition && f.sys.pod === "d",
      ) ?? forecasts.find((f) => f.weather[0].main === dominantCondition)!;

    const description =
      dailyDescriptions[dominantCondition] ?? dominantCondition;

    return {
      date,
      forecasts,
      minTemp: Math.min(...temperatures),
      maxTemp: Math.max(...temperatures),
      condition: dominantCondition,
      icon: representativeForecast.weather[0].icon,
      description,
    };
  });
}
