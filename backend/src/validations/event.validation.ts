import { z } from "zod";

export const eventSchema = z.object({
  image_url: z.string().optional(),
  event_name: z.string().min(1, "Event name is required"),
  rules: z.string().optional(),
  organizer: z.string().optional(),
  max_participants: z.number().optional(),
  event_description: z.string().min(1, "Event description is required"),
  important_dates: z.object(z.any()).optional(), 
  registration_deadline: z.date().optional(),
  prizes: z.object(z.any()),
  event_type: z.enum(["Online", "In Person"]),
  venue: z.string().optional(),
  contact_info: z.string().optional(),
  participation_type: z.enum(["Solo", "Team"]),
  max_team_size: z.number().int().optional(),
  department: z.string().optional(),
  category: z.string().optional(),
  registration_fee: z.number().multipleOf(0.01).optional(),
});
