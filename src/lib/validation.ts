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
  name: z.string().max(80).optional().or(z.literal("")),
  callsign: z.string().max(40).optional().or(z.literal("")),
  marketingConsent: z.boolean().optional().default(false),
  selectedTheater: theaterEnum.nullable().optional(),
  selectedSide: sideEnum.nullable().optional(),
  source: z.string().max(80).optional().default("homepage"),
});

export const careerApplicationSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  name: z.string().min(1, "Enter your name").max(80),
  role: z.string().min(1).max(80),
  note: z.string().max(500).optional().or(z.literal("")),
  linkedin: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => {
        if (!value) return true;
        try {
          const url = new URL(value);
          return (
            (url.protocol === "http:" || url.protocol === "https:") &&
            url.hostname.replace(/^www\./, "").endsWith("linkedin.com")
          );
        } catch {
          return false;
        }
      },
      { message: "Enter a valid LinkedIn URL" },
    ),
});

export const selectionSchema = z.object({
  anonymousSessionId: z.string().min(8).max(80),
  selectedTheater: theaterEnum.nullable(),
  selectedSide: sideEnum,
  eventType: z.enum(["select", "signup_complete"]),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
export type SelectionInput = z.infer<typeof selectionSchema>;
