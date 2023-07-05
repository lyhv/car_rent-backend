import * as bcrypt from 'bcrypt';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  hooks: {
    beforeCreate: async (instance: User) => {
      await hashPassword(instance);
    },
    beforeUpdate: async (instance) => {
      await hashPassword(instance);
    },
    beforeUpsert: async (instance) => {
      await hashPassword(instance);
    },
  },
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  })
  user_role_id: number;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column({
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    allowNull: false,
    validate: {
      min: 8,
    },
  })
  password: string;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;
}
async function hashPassword(instance: User) {
  const hashPassword = await bcrypt.hash(
    instance.password,
    parseInt(process.env.SALT_ROUNDS),
  );
  instance.password = hashPassword;
}

export default User;
