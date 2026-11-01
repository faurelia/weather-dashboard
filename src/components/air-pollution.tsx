import { getAirPollution, type Coordinates } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShieldAlertIcon } from "lucide-react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

type Props = {
  coordinates: Coordinates;
};

const AQI_DETAILS = {
  1: {
    label: "Good",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    bar: "[--primary:theme(colors.emerald.500)]",
    percent: 20,
    desc: "Air quality is satisfactory and poses little or no risk.",
  },
  2: {
    label: "Fair",
    color: "bg-lime-500/20 text-lime-400 border-lime-500/30",
    bar: "[--primary:theme(colors.lime.500)]",
    percent: 40,
    desc: "Air quality is generally acceptable.",
  },
  3: {
    label: "Moderate",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    bar: "[--primary:theme(colors.amber.500)]",
    percent: 60,
    desc: "Air quality may be a concern for sensitive individuals.",
  },
  4: {
    label: "Poor",
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    bar: "[--primary:theme(colors.orange.500)]",
    percent: 80,
    desc: "Sensitive individuals may experience health effects.",
  },
  5: {
    label: "Very Poor",
    color: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    bar: "[--primary:theme(colors.rose.500)]",
    percent: 100,
    desc: "Health effects may occur. Consider limiting outdoor exposure.",
  },
} as const;

const POLLUTANT_LABELS: Record<string, string> = {
  co: "CO",
  no: "NO",
  no2: "NO₂",
  o3: "O₃",
  so2: "SO₂",
  pm2_5: "PM2.5",
  pm10: "PM10",
  nh3: "NH₃",
};

const isValidAqi = (aqi: number): aqi is keyof typeof AQI_DETAILS => {
  return aqi in AQI_DETAILS;
};

const getAqiDetails = (aqi: number) => {
  if (isValidAqi(aqi)) {
    return AQI_DETAILS[aqi];
  }

  return {
    label: "Unknown",
    color: "bg-muted text-muted-foreground border-border",
    bar: "",
    percent: 0,
    desc: "AQI data unavailable.",
  };
};

export function AirPollution({ coordinates }: Props) {
  const { data: current } = useSuspenseQuery({
    queryKey: ["air-pollution", coordinates.lat, coordinates.lon],
    queryFn: () => getAirPollution(coordinates),
  });

  const aqi = current.main.aqi;
  const aqiDetails = getAqiDetails(aqi);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlertIcon className="size-4" />
          <h2 className="uppercase">Air Quality Index (AQI)</h2>

          <span
            className={cn(
              aqiDetails.color,
              "text-sm ml-auto py-1 px-2 rounded border",
            )}
          >
            {isValidAqi(aqi) ? `${aqi}/5` : "-/-"} {aqiDetails.label}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Progress
            value={aqiDetails.percent}
            className={cn("rounded-full", aqiDetails.bar)}
          />

          <p className="text-sm text-muted-foreground">{aqiDetails.desc}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(current.components).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col items-center gap-1 border rounded p-2 bg-foreground/5 border-foreground/10"
            >
              <span className="font-semibold text-muted-foreground">
                {POLLUTANT_LABELS[key] ?? key.toUpperCase()}
              </span>

              <span className="font-medium tabular-nums">
                {Number(value.toFixed(2)).toLocaleString()}
              </span>

              <span className="text-xs text-muted-foreground">μg/m³</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Updated{" "}
          {new Date(current.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
