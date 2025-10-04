import { z } from "zod";

export const teamSchema = z.object({
  event_id: z.number(),                
  team_name: z.string().min(1, "Team name is required"),
  member_ids: z.array(z.number()).optional(),  
});
