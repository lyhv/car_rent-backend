import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'rentals' })
export class Rental extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  user_id: number;

  @Column
  car_id: number;

  @Column
  car_price_id: number;

  @Column
  billing_info_id: number;

  @Column({ unique: true })
  payment_id: number;

  @Column
  location_pick_up_id: number;

  @Column
  location_drop_id: number;

  @Column
  rental_start_date: Date;

  @Column
  rental_end_date: Date;

  @Column
  return_date: Date;

  @Column
  rental_status_id: string;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;
}

export default Rental;
