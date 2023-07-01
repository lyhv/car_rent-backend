export interface Car {
  car_id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  available: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface PriceHistory {
  price_id: number;
  car_id: number;
  price_per_day: number;
  effective_date: Date;
  created_at: Date;
  updated_at: Date;
}
