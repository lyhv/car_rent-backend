import { Column, DataType, Model, Table } from 'sequelize-typescript';
@Table({ tableName: 'payment_statuses' })
export class PaymentStatus extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ unique: true })
  status: string;
}

export default PaymentStatus;
