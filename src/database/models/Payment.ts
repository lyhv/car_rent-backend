import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'payments' })
export class Payment extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ unique: true })
  rental_id: number;

  @Column
  payment_amount: number;

  @Column
  payment_date: Date;

  @Column
  payment_method_id: number;

  @Column
  transaction_id: number;

  @Column
  payment_status_id: string;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;
}

export default Payment;
