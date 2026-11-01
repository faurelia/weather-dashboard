import { DropletsIcon, GaugeIcon, MapPinIcon, ThermometerIcon, WindIcon } from "lucide-react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { Separator } from "./ui/separator";

export default function CurrentWeather() {
  const { data } = useSuspenseQuery({
    queryKey: ["currentWeather"],
    queryFn: getCurrentWeather,
  });

  const weather = data.weather[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPinIcon className="size-4" />
          {data.name}, {data.sys.country}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Main weather information */}
        <div className="flex items-center gap-4">
          <div>
            <p className="text-5xl font-bold">{data.main.temp.toFixed(1)} °C</p>

            <p className="text-lg font-semibold capitalize">{weather.description}</p>

            <p className="text-sm text-muted-foreground">
              Feels like {data.main.feels_like.toFixed(1)} °C
            </p>
          </div>

          <div className="ml-auto flex flex-col items-center gap-2 rounded-md border p-4 bg-accent">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
            />
            <p className="uppercase">{weather.main}</p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Additional weather information */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex items-center gap-2 border bg-accent-foreground/5 p-4 rounded-md">
            <DropletsIcon className="size-6 text-sky-400" />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Humidity</span>
              <span className="font-bold">{data.main.humidity}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border bg-accent-foreground/5 p-4 rounded-md">
            <WindIcon className="size-6 text-teal-400" />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Wind</span>
              <span className="font-bold">{data.wind.speed} m/s</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border bg-accent-foreground/5 p-4 rounded-md">
            <GaugeIcon className="size-6 text-amber-400" />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Pressure</span>
              <span className="font-bold">{data.main.pressure} hPa</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border bg-accent-foreground/5 p-4 rounded-md">
            <ThermometerIcon className="size-6 text-rose-400" />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">High / Low</span>
              <span className="font-bold">
                {data.main.temp_max.toFixed(1)}° / {data.main.temp_min.toFixed(1)}°
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
