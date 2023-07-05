import { Column, DataType, Model, Table } from 'sequelize-typescript';
@Table({ tableName: 'payment_statuses' })
export class PaymentStatus extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ unique: true })
  status: string;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;
}

export default PaymentStatus;
