import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'promo_codes' })
export class PromoCode extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ unique: true })
  payment_id: number;

  @Column({ unique: true })
  code: string;

  @Column
  discount: number;

  @Column
  expires_time: Date;
}

export default PromoCode;
