import { z } from "zod";

const theaterEnum = z.enum(["eastern-europe", "levant", "africa", "asia"]);
const sideEnum = z.enum([
  "ukraine",
  "russia",
  "israel",
  "palestine",
  "saf",
  "rsf",
  "junta",
  "resistance",
  "no-preference",
]);

export const waitlistSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  callsign: z.string().max(40).optional().or(z.literal("")),
  marketingConsent: z.boolean().optional().default(false),
  selectedTheater: theaterEnum.nullable().optional(),
  selectedSide: sideEnum.nullable().optional(),
  source: z.string().max(80).optional().default("homepage"),
});

export const selectionSchema = z.object({
  anonymousSessionId: z.string().min(8).max(80),
  selectedTheater: theaterEnum.nullable(),
  selectedSide: sideEnum,
  eventType: z.enum(["select", "signup_complete"]),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type SelectionInput = z.infer<typeof selectionSchema>;
