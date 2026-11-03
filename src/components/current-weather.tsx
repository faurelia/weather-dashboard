import { MapPinIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { itemDetails } from "@/lib/weather.utils";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getCurrentWeather, type Coordinates } from "@/lib/api";

type Props = {
  coordinates: Coordinates;
};

export function CurrentWeather({ coordinates }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", "current", coordinates.lat, coordinates.lon],
    queryFn: () => getCurrentWeather(coordinates),
  });

  const weather = data.weather[0];

  const itemValues = [
    `${data.main.humidity}%`,
    `${data.wind.speed} m/s`,
    `${data.main.pressure} hPa`,
    `${data.main.temp_max.toFixed(1)}° / ${data.main.temp_min.toFixed(1)}°`,
  ];

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
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-5xl font-semibold">
              {data.main.temp.toFixed(1)} °C
            </p>

            <p className="text-lg font-semibold capitalize">
              {weather.description}
            </p>

            <p className="text-sm text-muted-foreground">
              Feels like {data.main.feels_like.toFixed(1)} °C
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-md border p-2 bg-accent">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
            />
            <p className="uppercase">{weather.main}</p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Additional weather information */}
        <div className="grid grid-cols-2 gap-4">
          {itemDetails.map(({ icon: Icon, iconColor, title }, index) => (
            <Item
              key={title}
              variant="outline"
              size="sm"
              className="bg-foreground/5"
            >
              <ItemMedia variant="icon" className="my-auto">
                <Icon className={cn("size-6", iconColor)} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-xs text-muted-foreground">
                  {title}
                </ItemTitle>
                <ItemDescription className="font-bold text-foreground">
                  {itemValues[index]}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
