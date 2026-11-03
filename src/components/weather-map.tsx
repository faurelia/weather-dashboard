import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { Coordinates } from "@/lib/api";
import { useEffect } from "react";
import "@/lib/leaflet-icons";

type WeatherMapProps = {
  coordinates: Coordinates;
  onCoordinatesChange: (coordinates: Coordinates) => void;
};

function MapUpdater({ coordinates }: Pick<WeatherMapProps, "coordinates">) {
  const map = useMap();

  useEffect(() => {
    map.setView([coordinates.lat, coordinates.lon], map.getZoom());
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

export function WeatherMap({
  coordinates,
  onCoordinatesChange,
}: WeatherMapProps) {
  const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;
  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lon]}
      zoom={10}
      scrollWheelZoom={false}
      className="rounded-xl w-full h-full"
    >
      <MapUpdater coordinates={coordinates} />
      <MapClickHandler onCoordinatesChange={onCoordinatesChange} />

      <TileLayer
        url={`https://api.maptiler.com/maps/dataviz-dark/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; OpenStreetMap contributors'
      />
      <Marker position={[coordinates.lat, coordinates.lon]} />
    </MapContainer>
  );
}
