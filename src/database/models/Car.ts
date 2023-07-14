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
import Rental from './Rental';

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

  @HasMany(() => CarPrice, {
    foreignKey: 'car_id',
    as: 'car_prices',
  })
  car_prices: CarPrice[];

  @HasMany(() => Rental)
  rentals: Rental[];

  @HasMany(() => CarImage, {
    foreignKey: 'car_id',
    as: 'images', // Ensure this matches the alias used in the includeClause
  })
  images: CarImage[];
}

export default Car;
