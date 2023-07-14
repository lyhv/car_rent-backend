import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  rental_id: number;

  @IsNumber()
  payment_amount: number;

  @IsDate()
  payment_date: Date;

  @IsString()
  @IsOptional()
  transaction_id?: string = null;

  @IsNumber()
  payment_method_id: number;

  @IsNumber()
  payment_status_id: number;
}
