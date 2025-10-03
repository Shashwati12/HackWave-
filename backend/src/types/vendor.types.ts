export interface vendorData {
  service_type?: string
  name?: string         
  contact_info?: string 
  pledged_amount?: number
  image_url?: string   
  password?: string
}

export interface vendorEventCollab {
  event_id: number,
  vendor_id: number,
  invested_amount: number
  layer: string
  earned_amount: number
}