export interface vendorData {
  service_type?: string
  fees?: number
}

export interface vendorEventCollab {
  event_id?: number,
  vendor_id?: number,
  invested_amount?: number
  service_type?: string
  earned_amount?: number
}