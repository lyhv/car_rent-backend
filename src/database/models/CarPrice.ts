import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Car from './Car';

@Table({ tableName: 'car_prices' })
export class CarPrice extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  @ForeignKey(() => Car)
  car_id: number;

  @BelongsTo(() => Car)
  car: number;

  @Column({ type: DataType.INTEGER })
  price_per_day: number;

  @Column
  effective_date: Date;
}

export default CarPrice;
