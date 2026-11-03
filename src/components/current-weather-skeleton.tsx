import {
  DropletsIcon,
  GaugeIcon,
  MapPinIcon,
  ThermometerIcon,
  WindIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function CurrentWeatherSkeleton() {
  const itemDetails = [
    {
      icon: DropletsIcon,
      iconColor: "text-sky-400",
      title: "Humidity",
    },
    {
      icon: WindIcon,
      iconColor: "text-teal-400",
      title: "Wind",
    },
    {
      icon: GaugeIcon,
      iconColor: "text-amber-400",
      title: "Pressure",
    },
    {
      icon: ThermometerIcon,
      iconColor: "text-rose-400",
      title: "High / Low",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPinIcon className="size-4" />
          <Skeleton className="h-6 w-31" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Main weather information */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-12 w-44" />
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-5 w-32" />
          </div>

          <Skeleton className="h-36.5 w-29 rounded-md" />
        </div>

        <Separator className="my-4" />

        {/* Additional weather information */}
        <div className="grid grid-cols-2 gap-4">
          {itemDetails.map(({ icon: Icon, iconColor, title }) => (
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
                <div className="font-bold text-foreground">
                  <Skeleton className="h-5.25 w-20" />
                </div>
              </ItemContent>
            </Item>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
