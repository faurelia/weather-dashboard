# Weather Dashboard

A responsive weather dashboard built with React, TypeScript, and Vite. Look up a
city or choose a point on the map to see current weather, a five-day forecast,
and air quality for that location.

## Features

- Current conditions, including temperature, feels-like temperature, humidity,
  wind speed, pressure, and today's high and low.
- Five-day forecast with three-hour intervals; expand a day to see its details.
- Air Quality Index (AQI) and pollutant concentrations.
- Interactive dark map. Select a location on the map to update the weather.
- Uses the browser's location when permission is granted; otherwise starts at
  Tokyo, Japan. Search for a city at any time.
- Loading placeholders and cached API requests powered by TanStack Query.

## Requirements

- Node.js and [pnpm](https://pnpm.io/installation).
- An [OpenWeather](https://openweathermap.org/api) API key for geocoding,
  current weather, forecasts, and air pollution data.
- A [MapTiler](https://www.maptiler.com/cloud/) API key for map tiles.

Both API keys are used in the browser, so they are visible to users of a
deployed app. Use keys with appropriate provider-side restrictions and usage
limits; do not commit your local environment file.

## Getting started

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Create a `.env.local` file in the project root:

   ```dotenv
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   VITE_MAPTILER_API_KEY=your_maptiler_api_key
   ```

3. Start the development server:

   ```sh
   pnpm dev
   ```

   Open the local URL printed by Vite.

The OpenWeather key is required for weather data and city search. The MapTiler
key is required to load the map's basemap.

## Commands

| Command        | Description                           |
| -------------- | ------------------------------------- |
| `pnpm dev`     | Start the local development server.   |
| `pnpm build`   | Create a production build.            |
| `pnpm preview` | Preview the production build locally. |
| `pnpm lint`    | Run the linter.                       |
| `pnpm check`   | Run the project's checks.             |
| `pnpm format`  | Format project files.                 |

## Tech stack

- React 19 and TypeScript
- Vite (via Vite+)
- TanStack Query
- Leaflet and React Leaflet
- Tailwind CSS
- OpenWeather APIs and MapTiler map tiles
