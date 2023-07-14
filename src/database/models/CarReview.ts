import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'car_reviews' })
export class CarReview extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  car_id: number;

  @Column
  user_id: number;

  @Column
  rating: number;

  @Column
  message: string;
}

export default CarReview;
