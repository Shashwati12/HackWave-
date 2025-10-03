export interface sponsorData {
  service_type?: string
  name?: string         
  contact_info?: string 
  pledged_amount?: number
  image_url?: string   
  password?: string
}

export interface sponsorEventCollab {
  event_id: number,
  sponsor_id: number,
  invested_amount: number
  service_type: string
  earned_amount: number
}