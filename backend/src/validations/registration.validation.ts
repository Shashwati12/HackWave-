import { z } from "zod";

export const teamSchema = z.object({
  event_id: z.string(),
  team_name: z.string().min(1, "Team name is required"),
  member_ids: z.array(z.string()).optional(),
});
