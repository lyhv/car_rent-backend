import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import Car from './Car';

@Table({ tableName: 'car_types' })
export class CarType extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ unique: true })
  type: string;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;

  @HasMany(() => Car)
  cars: Car[];
}

export default CarType;
