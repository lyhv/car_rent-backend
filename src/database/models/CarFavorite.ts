import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'car_favorites' })
export class CarFavorite extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  user_id: number;

  @Column
  car_id: number;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;
}

export default CarFavorite;
