import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import BillingInfo from './BillingInfo';
import Car from './Car';
import Location from './Location';
import Payment from './Payment';
import RentalStatus from './RentalStatus';

@Table({ tableName: 'rentals' })
export class Rental extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  user_id: number;

  @Column
  @ForeignKey(() => Car)
  car_id: number;

  @BelongsTo(() => Car)
  car: Car;

  @Column
  car_price_id: number;

  @Column
  @ForeignKey(() => BillingInfo)
  billing_info_id: number;

  @BelongsTo(() => BillingInfo)
  billing_info: BillingInfo;

  @Column
  @ForeignKey(() => Location)
  location_pick_up_id: number;

  @BelongsTo(() => Location, 'location_pick_up_id')
  location_pick_up: Location;

  @Column
  @ForeignKey(() => Location)
  location_drop_id: number;

  @BelongsTo(() => Location, 'location_drop_id')
  location_drop: Location;

  @Column
  rental_start_date: Date;

  @Column
  rental_end_date: Date;

  @Column
  return_date: Date;

  @Column
  @ForeignKey(() => RentalStatus)
  rental_status_id: number;

  @BelongsTo(() => RentalStatus)
  rental_status: RentalStatus;

  @HasOne(() => Payment)
  payment: Payment;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;
}

export default Rental;
