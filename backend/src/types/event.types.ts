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
}

export interface EventFilters {
  type?: string;
  department?: string;
  category?: string;
}