export interface Rental {
  rental_id: number;
  customer_id: number;
  car_id: number;
  location_pick_up: string;
  location_drop: string;
  rental_start_date: Date;
  rental_end_date: Date;
  return_date: Date;
  created_at: Date;
  updated_at: Date;
  status: string;
}
export interface Payment {
  payment_id: number;
  rental_id: number;
  payment_amount: number;
  payment_date: Date;
  payment_method: string;
  card_id: number;
  transaction_id: number;
  payment_status: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreditCard {
  card_id: number;
  customer_id: number;
  card_number: string;
  card_name: string;
  cvc: string;
  created_at: Date;
  updated_at: Date;
}

export interface PayPalTransaction {
  transaction_id: number;
  customer_id: number;
  transaction_details: string;
  created_at: Date;
  updated_at: Date;
}

export interface EthTransaction {
  transaction_hash: string;
  customer_id: number;
  transaction_details: string;
  created_at: Date;
  updated_at: Date;
}

export interface Session {
  session_id: number;
  customer_id: number;
  car_id: number;
  created_at: Date;
  updated_at: Date;
  expiration_time: Date;
}
