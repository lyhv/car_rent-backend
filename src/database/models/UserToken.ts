import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user_tokens',
})
export class UserToken extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ unique: true })
  user_id: number;

  @Column({
    unique: true,
    type: DataType.STRING, // Reduce the length of the column
    allowNull: false,
  })
  access_token: string;

  @Column({
    unique: true,
    type: DataType.STRING, // Reduce the length of the column
    allowNull: false,
  })
  refresh_token: string;

  @Column
  expires_in: number;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;
}

export default UserToken;
