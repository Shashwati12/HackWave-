
export interface Event {
  id: string; 
  event_name: string;
  event_description: string;
  event_creator_id: string | null;  
  important_dates: Record<string, any> | null; 
  registration_deadline: string | null; 
  prizes: Record<string, any> | null; 
  event_type: 'Online' | 'In Person' | null;
  venue: string | null;
  contact_info: string | null;
  participation_type: 'Solo' | 'Team' | null;
  max_team_size: number | null;
  department: string | null;
  category: string | null;
  registration_fee: number | null;
  created_at: string; 
  updated_at: string; 
  image_url: string | null;
  rules: string | null;
  organizer: string | null;
  max_participants: number; 
}

export interface Team {
  id: string; 
  event_id: string | null; 
  name: string;
  leader_id: string | null; 
  created_at: string; 
}

export interface TeamMember {
  team_id: string; 
  member_id: string; 
  event_id: string | null; 
}
