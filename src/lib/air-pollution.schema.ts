import { z } from "zod";
import { coordSchema } from "./weather.schema";

// Air Quality Index
const airQualityMainSchema = z.object({
  aqi: z.number().int().min(1).max(5),
});

// Pollutant concentrations (μg/m³)
const airQualityComponentsSchema = z.object({
  co: z.number(),
  no: z.number(),
  no2: z.number(),
  o3: z.number(),
  so2: z.number(),
  pm2_5: z.number(),
  pm10: z.number(),
  nh3: z.number(),
});

// Individual air pollution measurement
const airPollutionItemSchema = z.object({
  dt: z.number().int(),
  main: airQualityMainSchema,
  components: airQualityComponentsSchema,
});

// Complete API response
export const airPollutionSchema = z.object({
  coord: coordSchema,
  list: z.array(airPollutionItemSchema),
});

// Inferred types
export type AirPollution = z.infer<typeof airPollutionSchema>;
export type AirPollutionItem = z.infer<typeof airPollutionItemSchema>;
export type AirQualityComponents = z.infer<typeof airQualityComponentsSchema>;
