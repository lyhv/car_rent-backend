import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  Max,
  Min,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
@ValidatorConstraint({ name: 'dateComparison', async: false })
export class DateComparisonValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const startDate = args.object['rental_start_date'];
    const endDate = value;
    return endDate >= startDate;
  }

  defaultMessage(args: ValidationArguments) {
    return 'rental_end_date must be greater than or equal to rental_start_date';
  }
}
export class CreateRentalDto {
  @IsNumber()
  @ApiProperty({
    default: 1,
  })
  @Min(1)
  car_id: number;

  @IsNumber()
  @ApiProperty({
    default: 1,
  })
  @Min(1)
  @Max(2)
  payment_method_id: number;

  @IsNumber()
  @ApiProperty({
    default: 1,
  })
  @Min(1)
  billing_info_id: number;

  @IsNumber()
  @ApiProperty({
    default: 1,
  })
  @Min(1)
  location_pick_up_id: number;

  @IsNumber()
  @ApiProperty({
    default: 2,
  })
  @Min(1)
  location_drop_id: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  rental_start_date: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @Validate(DateComparisonValidator)
  rental_end_date: Date;

  getTotalRentalDays(): number {
    const timeDifference =
      this.rental_end_date.getTime() - this.rental_start_date.getTime();
    const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (totalDays == 0) {
      return 1;
    }
    return totalDays;
  }
}
