import { z } from "zod";

export const eventSchema = z.object({
  eventData: z.object({
    event_name: z.string(),
    event_description: z.string(),
    important_dates: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date().optional()),
    registration_deadline: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date().optional()),
    prizes: z.string().optional(),
    event_type: z.string().optional(),
    venue: z.string().optional(),
    contact_info: z.string().optional(),
    participation_type: z.string().optional(),
    max_team_size: z.preprocess((val) => (val ? Number(val) : undefined), z.number().optional()),
    category: z.string().optional(),
    department: z.string().optional(),
    registration_fee: z.preprocess((val) => (val ? Number(val) : undefined), z.number().optional()),
  }),
});
