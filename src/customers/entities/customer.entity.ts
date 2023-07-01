export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  google_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface BillingAddress {
  billing_address_id: number;
  customer_id: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  created_at: Date;
  updated_at: Date;
}
