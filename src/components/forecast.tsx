import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  DropletIcon,
} from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getForecast, type Coordinates } from "@/lib/api";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";

type Props = {
  coordinates: Coordinates;
};

export function Forecast({ coordinates }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", "forecast", coordinates.lat, coordinates.lon],
    queryFn: () => getForecast(coordinates),
  });

  const [openDay, setOpenDay] = useState<string | null>(
    data.days[0]?.date || null,
  );

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="size-4" />
          <h2 className="uppercase">5-day / 3-hour Forecast Breakdown</h2>
          <span className="text-sm text-muted-foreground ml-auto">
            Click a day to expand hourly data
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {data.days.map((day) => {
          return (
            <Collapsible
              className="border rounded-md"
              key={day.date}
              open={openDay === day.date}
              onOpenChange={(isOpen) => setOpenDay(isOpen ? day.date : null)}
            >
              <CollapsibleTrigger className="w-full   cursor-pointer transition-colors bg-accent/85 hover:bg-accent p-4 rounded-md data-panel-open:rounded-b-none flex items-center justify-between">
                <div className="font-semibold">
                  <span className="text-lg">
                    {dateFormatter.format(new Date(day.date))}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold mr-2 text-lg">
                    {day.maxTemp.toFixed(1)} °C
                  </span>
                  <span className="text-muted-foreground">
                    {day.minTemp.toFixed(1)}
                    °C
                  </span>
                  {openDay === day.date ? (
                    <ChevronDownIcon className="size-4 ml-2" />
                  ) : (
                    <ChevronUpIcon className="size-4 ml-2" />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="flex lg:grid lg:grid-cols-8 gap-4 overflow-x-auto p-4 ">
                  {day.forecasts.map((forecast) => (
                    <div
                      key={forecast.dt}
                      className="shrink-0 min-w-25 border rounded-md bg-accent p-2  flex flex-col items-center gap-2"
                    >
                      <p className="text-sm text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                        <ClockIcon className="size-4" />
                        {timeFormatter.format(new Date(forecast.dt * 1000))}
                      </p>
                      <img
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                        alt={forecast.weather[0].description}
                        className="size-16 object-contain"
                        loading="lazy"
                      />
                      <p className="text-lg font-semibold">
                        {forecast.main.temp.toFixed(1)} °C
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DropletIcon className="size-4 text-sky-400" />
                        {forecast.main.humidity}%
                      </p>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
}
