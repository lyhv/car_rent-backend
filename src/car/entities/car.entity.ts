import { Exclude, Expose, Type, plainToClass } from 'class-transformer';
import CarPrice from 'src/database/models/CarPrice';
import CarImage from './car_images.entity';
import { CarType } from './car_type.entity';

@Exclude()
export class Car {
  constructor(partial: Partial<Car>) {
    Object.assign(this, plainToClass(Car, partial));
  }
  @Expose()
  id: number;

  @Expose()
  created_by_user_id: number;

  @Expose()
  capacity: number;

  @Expose()
  steering: string;

  @Expose()
  gasoline: number;

  @Expose()
  name: string;

  @Expose()
  brand: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  available: boolean;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  @Type(() => CarType)
  car_type: CarType;

  @Expose()
  @Type(() => CarPrice)
  car_price: CarPrice;

  @Expose()
  @Type(() => CarImage)
  images: CarImage[];
}
