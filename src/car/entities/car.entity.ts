import { Exclude, Expose, Type, plainToClass } from 'class-transformer';
import CarPrice from 'src/database/models/CarPrice';
import CarImage from './car_images.entity';
import { CarType } from './car_type.entity';

@Exclude()
export class CarEntity {
  constructor(partial: Partial<CarEntity>) {
    Object.assign(this, plainToClass(CarEntity, partial));
  }
  @Expose()
  id: number;

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
  @Type(() => CarType)
  car_type: CarType;

  @Expose()
  @Type(() => CarPrice)
  car_price: CarPrice;

  @Expose()
  @Type(() => CarImage)
  images: CarImage[];
}
