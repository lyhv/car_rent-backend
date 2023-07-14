import { IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  rental_id: number;

  @IsNumber()
  rental_status_id: number;

  @IsNumber()
  changed_by_user_id: number;
}
