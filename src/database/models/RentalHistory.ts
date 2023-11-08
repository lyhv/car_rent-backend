import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Rental from './Rental';
import RentalStatus from './RentalStatus';
import User from './User';

@Table({ tableName: 'rental_histories' })
export class RentalHistory extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  @ForeignKey(() => Rental)
  rental_id: number;

  @Column
  @ForeignKey(() => RentalStatus)
  rental_status_id: number;

  @BelongsTo(() => RentalStatus)
  rental_status: RentalStatus;

  @Column
  @ForeignKey(() => User)
  changed_by_user_id: number;
}

export default RentalHistory;
