import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import CarImage from './CarImage';
import CarPrice from './CarPrice';
import CarType from './CarType';

@Table({ tableName: 'cars' })
export class Car extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  @ForeignKey(() => CarType)
  car_type_id: number;

  @BelongsTo(() => CarType)
  car_type: CarType;

  @Column
  created_by_user_id: number;

  @Column
  capacity: number;

  @Column
  steering: string;

  @Column
  gasoline: number;

  @Column
  name: string;

  @Column
  brand: string;

  @Column
  model: string;

  @Column
  year: number;

  @Column({ defaultValue: true, type: DataType.BOOLEAN })
  available: boolean;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;

  @HasMany(() => CarPrice)
  car_prices: CarPrice[];

  @HasMany(() => CarImage)
  images: CarImage[];
}

export default Car;
