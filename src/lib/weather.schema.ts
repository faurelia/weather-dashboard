import { z } from "zod";

// ==========================================
// Reusable schemas
// ==========================================

const weatherConditionSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

const mainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  sea_level: z.number().optional(),
  grnd_level: z.number().optional(),
  temp_kf: z.number().optional(),
});

const cloudsSchema = z.object({
  all: z.number(),
});

const windSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number().optional(),
});

const precipitationSchema = z.object({
  "1h": z.number().optional(),
  "3h": z.number().optional(),
});

const forecastSysSchema = z.object({
  pod: z.enum(["d", "n"]),
});

const currentWeatherSysSchema = z.object({
  type: z.number().optional(),
  id: z.number().optional(),
  country: z.string(),
  sunrise: z.number(),
  sunset: z.number(),
});

export const coordSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export const geocodingSchema = z.array(
  z.object({
    name: z.string(),
    lat: z.number(),
    lon: z.number(),
    country: z.string(),
    state: z.string().optional(),
  }),
);

// ==========================================
// Current weather
// ==========================================

export const currentWeatherSchema = z.object({
  coord: coordSchema,
  weather: z.array(weatherConditionSchema).min(1),
  base: z.string(),
  main: mainSchema.omit({ temp_kf: true }),
  visibility: z.number(),
  wind: windSchema,
  rain: precipitationSchema.optional(),
  snow: precipitationSchema.optional(),
  clouds: cloudsSchema,
  dt: z.number(),
  sys: currentWeatherSysSchema,
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
});

// ==========================================
// Forecast
// ==========================================

const forecastItemSchema = z.object({
  dt: z.number(),
  main: mainSchema,
  weather: z.array(weatherConditionSchema).min(1),
  clouds: cloudsSchema,
  wind: windSchema,
  visibility: z.number().optional(),
  pop: z.number(),
  rain: precipitationSchema.optional(),
  snow: precipitationSchema.optional(),
  sys: forecastSysSchema,
  dt_txt: z.string(),
});

const forecastCitySchema = z.object({
  id: z.number(),
  name: z.string(),
  coord: coordSchema,
  country: z.string(),
  population: z.number(),
  timezone: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
});

export const forecastSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(forecastItemSchema),
  city: forecastCitySchema,
});

// ==========================================
// Inferred types
// ==========================================

export type CurrentWeather = z.infer<typeof currentWeatherSchema>;

export type Forecast = z.infer<typeof forecastSchema>;
export type ForecastItem = z.infer<typeof forecastItemSchema>;
export type ForecastCity = z.infer<typeof forecastCitySchema>;
