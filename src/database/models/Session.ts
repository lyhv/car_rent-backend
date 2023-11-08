import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'sessions' })
export class Session extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  user_id: number;

  @Column
  car_id: number;

  @Column
  expires_in: number;
}

export default Session;
