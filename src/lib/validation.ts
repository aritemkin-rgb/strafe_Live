import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  callsign: z.string().max(40).optional().or(z.literal("")),
  marketingConsent: z.boolean().optional().default(false),
  selectedTheater: z
    .enum(["eastern-europe", "levant"])
    .nullable()
    .optional(),
  selectedSide: z
    .enum(["ukraine", "russia", "israel", "palestine", "no-preference"])
    .nullable()
    .optional(),
  source: z.string().max(80).optional().default("homepage"),
});

export const selectionSchema = z.object({
  anonymousSessionId: z.string().min(8).max(80),
  selectedTheater: z.enum(["eastern-europe", "levant"]).nullable(),
  selectedSide: z.enum([
    "ukraine",
    "russia",
    "israel",
    "palestine",
    "no-preference",
  ]),
  eventType: z.enum(["select", "signup_complete"]),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type SelectionInput = z.infer<typeof selectionSchema>;
