
import { z } from "zod";

// Reusable schemas
const coordSchema = z.object({
    lat: z.number(),
    lon: z.number(),
});

const weatherSchema = z.object({
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
    sea_level: z.number().optional(),
    grnd_level: z.number().optional(),
    humidity: z.number(),
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

const sysSchema = z.object({
    pod: z.enum(["d", "n"]),
});

// Forecast item
const forecastItemSchema = z.object({
    dt: z.number(),
    main: mainSchema,
    weather: z.array(weatherSchema),
    clouds: cloudsSchema,
    wind: windSchema,
    visibility: z.number(),
    pop: z.number(),
    rain: precipitationSchema.optional(),
    snow: precipitationSchema.optional(),
    sys: sysSchema,
    dt_txt: z.string(),
});

// City information
const citySchema = z.object({
    id: z.number(),
    name: z.string(),
    coord: coordSchema,
    country: z.string(),
    population: z.number(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
});

// Complete forecast response
export const forecastWeatherSchema = z.object({
    cod: z.string(),
    message: z.number(),
    cnt: z.number(),
    list: z.array(forecastItemSchema),
    city: citySchema,
});

// Inferred TypeScript types
export type Forecast = z.infer<typeof forecastWeatherSchema>;
export type ForecastItem = z.infer<typeof forecastItemSchema>;
export type ForecastCity = z.infer<typeof citySchema>;
