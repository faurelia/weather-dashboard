import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { Coordinates } from "@/lib/api";
import "@/lib/leaflet-icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import {
  CloudIcon,
  CloudRainIcon,
  GaugeIcon,
  MapIcon,
  Maximize2Icon,
  Minimize2Icon,
  ThermometerIcon,
  WindIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

type WeatherMapProps = {
  coordinates: Coordinates;
  onCoordinatesChange: (coordinates: Coordinates) => void;
};

function MapUpdater({ coordinates }: Pick<WeatherMapProps, "coordinates">) {
  const map = useMap();

  useEffect(() => {
    map.panTo([coordinates.lat, coordinates.lon]);
  }, [coordinates.lat, coordinates.lon, map]);

  return null;
}

function MapClickHandler({
  onCoordinatesChange,
}: Pick<WeatherMapProps, "onCoordinatesChange">) {
  useMapEvents({
    click(event) {
      onCoordinatesChange({
        lat: event.latlng.lat,
        lon: event.latlng.lng,
      });
    },
  });

  return null;
}

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const handleFullscreenChange = () => {
      requestAnimationFrame(() => {
        map.invalidateSize({ pan: false });
      });
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [map]);

  return null;
}

const mapTypes = [
  { label: "Default map", value: "default", icon: MapIcon },
  { label: "Clouds", value: "clouds_new", icon: CloudIcon },
  {
    label: "Precipitation",
    value: "precipitation_new",
    icon: CloudRainIcon,
  },
  { label: "Pressure", value: "pressure_new", icon: GaugeIcon },
  { label: "Wind speed", value: "wind_new", icon: WindIcon },
  {
    label: "Temperature",
    value: "temp_new",
    icon: ThermometerIcon,
  },
];

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export function WeatherMap({
  coordinates,
  onCoordinatesChange,
}: WeatherMapProps) {
  const [mapType, setMapType] = useState("default");
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { theme } = useTheme();

  const mapStyle = theme === "dark" ? "dataviz-dark" : "dataviz-light";

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === mapWrapperRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await mapWrapperRef.current?.requestFullscreen();
    }
  };

  return (
    <div
      ref={mapWrapperRef}
      className={
        isFullscreen ? "h-screen w-screen overflow-auto bg-background p-4" : ""
      }
    >
      <Card className="[--card-spacing:--spacing(4)]">
        <CardHeader>
          <div className="flex items-center justify-end gap-4">
            <Select
              items={mapTypes}
              value={mapType}
              onValueChange={(value) => setMapType(value ?? "default")}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select Map Type" />
              </SelectTrigger>

              <SelectContent container={mapWrapperRef}>
                <SelectGroup>
                  {mapTypes.map(({ label, value, icon: Icon }) => (
                    <SelectItem key={value} value={value}>
                      <Icon className="size-4 text-muted-foreground" />
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2Icon className="size-4" />
              ) : (
                <Maximize2Icon className="size-4" />
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div
            className={`isolate ${
              isFullscreen ? "h-[calc(100vh-8rem)]" : "h-90"
            }`}
          >
            <MapContainer
              center={[coordinates.lat, coordinates.lon]}
              zoom={10}
              scrollWheelZoom={false}
              className="h-full w-full rounded-xl"
            >
              <MapUpdater coordinates={coordinates} />
              <MapClickHandler onCoordinatesChange={onCoordinatesChange} />
              <MapResizeHandler />

              {/* Base map */}
              <TileLayer
                url={`https://api.maptiler.com/maps/${mapStyle}/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; OpenStreetMap contributors'
              />

              {/* Weather overlay */}
              {mapType !== "default" && (
                <TileLayer
                  key={mapType}
                  url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`}
                  opacity={0.6}
                />
              )}

              <Marker position={[coordinates.lat, coordinates.lon]} />
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
