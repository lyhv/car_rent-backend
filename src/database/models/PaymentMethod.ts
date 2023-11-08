import { Column, DataType, Model, Table } from 'sequelize-typescript';
@Table({ tableName: 'payment_method' })
export class PaymentMethod extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ unique: true })
  method: string;
}

export default PaymentMethod;
