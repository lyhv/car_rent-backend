import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import PaymentMethod from './PaymentMethod';
import PaymentStatus from './PaymentStatus';
import Rental from './Rental';

@Table({ tableName: 'payments' })
export class Payment extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ unique: true })
  @ForeignKey(() => Rental)
  rental_id: number;

  @Column
  payment_amount: number;

  @Column
  payment_date: Date;

  @Column
  @ForeignKey(() => PaymentMethod)
  payment_method_id: number;

  @BelongsTo(() => PaymentMethod)
  payment_method: PaymentMethod;

  @Column
  transaction_id: number;

  @Column
  @ForeignKey(() => PaymentStatus)
  payment_status_id: number;

  @BelongsTo(() => PaymentStatus)
  PaymentStatus: PaymentStatus;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;
}

export default Payment;
