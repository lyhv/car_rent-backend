import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'billing_infos' })
export class BillingInfo extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  user_id: number;

  @Column
  address: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  country: string;

  @Column
  postal_code: string;
}
export default BillingInfo;
