import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'car_favorites' })
export class CarFavorite extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  user_id: number;

  @Column
  car_id: number;
}

export default CarFavorite;
