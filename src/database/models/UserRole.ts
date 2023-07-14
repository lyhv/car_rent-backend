import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'user_roles' })
export class UserRole extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ unique: true })
  role: number;
}
export default UserRole;
