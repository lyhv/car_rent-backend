import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CarType {
  @Expose()
  id: number;

  @Expose()
  type: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
