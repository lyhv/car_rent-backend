import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'locations' })
export class Location extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column
  name: string;

  @Column
  address: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  country: string;

  @Column
  postal_code: string;

  @Column({ defaultValue: () => new Date() })
  created_at: Date;

  @Column({ defaultValue: () => new Date() })
  updated_at: Date;
}

export default Location;
