import { Expose } from 'class-transformer';

@Expose()
export class CarImage {
  @Expose()
  id: number;

  @Expose()
  image_url: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}

export default CarImage;
