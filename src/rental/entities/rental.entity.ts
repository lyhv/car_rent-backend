import { Exclude, Expose, plainToClass } from 'class-transformer';
import { CarEntity } from 'src/car/entities/car.entity';
import BillingInfo from 'src/database/models/BillingInfo';
import Payment from 'src/database/models/Payment';
import PaymentStatus from 'src/database/models/PaymentStatus';
import RentalStatus from 'src/database/models/RentalStatus';

@Exclude()
export class Rental {
  constructor(partial: Partial<Rental>) {
    Object.assign(this, plainToClass(Rental, partial));
  }
  @Expose()
  id: number;
  @Expose()
  car: CarEntity;
  @Expose()
  billingInfo: BillingInfo;
  @Expose()
  payment_status: PaymentStatus;
  @Expose()
  rental_status: RentalStatus;
  @Expose()
  location_pick_up: Location;
  @Expose()
  location_drop: Location;
  @Expose()
  rental_start_date: Date;
  @Expose()
  rental_end_date: Date;
  @Expose()
  return_date: Date;
  @Expose()
  payment: Payment;
  @Expose()
  created_at: Date;
  @Expose()
  updated_at: Date;
}
