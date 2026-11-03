import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  DropletIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import { getForecast, type Coordinates } from "@/lib/api";

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

  useEffect(() => {
    setOpenDay(data.days[0]?.date ?? null);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4" />
            <h2 className="uppercase">5-day / 3-hour Forecast Breakdown</h2>
          </div>
          <span className="text-sm text-muted-foreground">
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
              <CollapsibleTrigger className="w-full cursor-pointer transition-colors bg-accent/85 hover:bg-accent rounded-md data-panel-open:rounded-b-none">
                <Item>
                  <ItemMedia variant="image" className="w-10 h-10">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      alt={day.description}
                      className="object-cover"
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      {dateFormatter.format(new Date(`${day.date}T12:00:00`))}
                    </ItemTitle>
                    <ItemDescription className="text-xs text-muted-foreground">
                      {day.description}
                    </ItemDescription>
                  </ItemContent>
                  <ItemContent>
                    <ItemTitle>{day.maxTemp.toFixed(1)}°</ItemTitle>
                    <ItemDescription className="text-xs text-muted-foreground">
                      {day.minTemp.toFixed(1)}°C
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    {openDay === day.date ? (
                      <ChevronUpIcon className="size-4" />
                    ) : (
                      <ChevronDownIcon className="size-4" />
                    )}
                  </ItemActions>
                </Item>
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 border-t">
                <div className="flex lg:grid lg:grid-cols-8 gap-4 overflow-x-auto snap-x snap-mandatory lg:snap-none">
                  {day.forecasts.map((forecast) => (
                    <Card
                      key={forecast.dt}
                      className="[--card-spacing:--spacing(2)] bg-accent rounded-md border shrink-0 min-w-25 snap-start lg:snap-align-none"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                          <h3 className="text-sm text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                            <ClockIcon className="size-4" />
                            {timeFormatter.format(new Date(forecast.dt * 1000))}
                          </h3>
                        </CardTitle>
                        <CardContent className="flex flex-col items-center gap-2">
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
                        </CardContent>
                      </CardHeader>
                    </Card>
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
