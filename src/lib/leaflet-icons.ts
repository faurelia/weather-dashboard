import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Disable Leaflet's automatic icon URL lookup.
delete (
  L.Icon.Default.prototype as unknown as {
    _getIconUrl?: unknown;
  }
)._getIconUrl;

// Use Vite's imported asset URLs instead.
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});
