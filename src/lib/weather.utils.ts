import {
  DropletsIcon,
  GaugeIcon,
  ThermometerIcon,
  WindIcon,
  type LucideIcon,
} from "lucide-react";

export const POLLUTANT_LABELS: Record<string, string> = {
  co: "CO",
  no: "NO",
  no2: "NO₂",
  o3: "O₃",
  so2: "SO₂",
  pm2_5: "PM2.5",
  pm10: "PM10",
  nh3: "NH₃",
};

type ItemDetails = {
  icon: LucideIcon;
  iconColor: string;
  title: string;
};

export const itemDetails = [
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
] satisfies ItemDetails[];
