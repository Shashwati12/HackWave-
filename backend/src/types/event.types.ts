export interface Event {
  id: string;
  name: string;
  description: string;
  event_type: string;
  department?: string;
  category?: string;
  team_size?: number;
  start_date?: string;
  end_date?: string;
  prize?: string;
  judging_criteria?: string;
  contact_email?: string;
  image_url?: string;
  event_creator_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface EventData {
  event_name: string;
  event_description: string;
  important_dates?: string;
  registration_deadline?: string;
  prizes?: string;
  event_type?: string;
  venue?: string;
  contact_info?: string;
  participation_type?: string;
  max_team_size?: number;
  category?: string;
  department?: string;
  registration_fee?: number;
  image_url?: string;
  rules?: string;
  organizer?: string;
  layer?: string;
  max_participants?: number;
  eligibility?: string;
}




export interface EventFilters {
  type?: string;
  department?: string;
  category?: string;
}