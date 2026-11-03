import { ShieldAlertIcon } from "lucide-react";
import { POLLUTANT_LABELS } from "@/lib/weather.utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AirPollutionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlertIcon className="size-4" />
          <h2 className="uppercase">Air Quality Index (AQI)</h2>

          <Skeleton className="ml-auto h-7.5 w-24" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* AQI information */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-1.5 w-full rounded-full" />

          <div className="space-y-1">
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>

        {/* Pollutant information */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Object.entries(POLLUTANT_LABELS).map(([key, label]) => (
            <div
              key={key}
              className="flex flex-col items-center gap-1 rounded border border-foreground/10 bg-foreground/5 p-2"
            >
              <span className="font-semibold text-muted-foreground">
                {label}
              </span>

              <Skeleton className="h-5 w-14" />

              <span className="text-xs text-muted-foreground">μg/m³</span>
            </div>
          ))}
        </div>

        {/* Updated time */}
        <Skeleton className="h-4 w-28" />
      </CardContent>
    </Card>
  );
}
