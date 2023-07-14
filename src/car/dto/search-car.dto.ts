import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class GetCarsQueryParams {
  @ApiProperty({
    default: 'a',
    required: false,
  })
  @IsString()
  @IsOptional()
  public search_car_name: string;

  @ApiProperty({
    type: String,
    description: 'List of numbers in format "number1,number2"',
    default: '4,5',
    required: false,
  })
  @IsOptional()
  @Matches(/^(\d+,)*\d+$/, {
    message:
      'The capacities field must contain one or more numbers separated by commas, e.g., "123,456,789".',
  })
  public capacities?: string;

  @ApiProperty({
    type: String,
    description: 'List of numbers in format "car_type_id_1,car_type_id_2"',
    default: '1,2',
    required: false,
  })
  @IsOptional()
  @Matches(/^(\d+,)*\d+$/, {
    message:
      'The car_type_ids field must contain one or more numbers separated by commas, e.g., "123,456,789".',
  })
  public car_type_ids?: string;

  @ApiProperty({
    default: 500,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  public max_price: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    default: 0,
    required: true,
  })
  public offset: number;

  @ApiProperty({
    required: true,
    default: 20,
  })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  public limit: number;
  carTypeIdList() {
    return this.capacities ? this.capacities.split(',').map(Number) : [];
  }

  capacityList() {
    return this.car_type_ids ? this.car_type_ids.split(',').map(Number) : [];
  }
  constructor(partial: Partial<GetCarsQueryParams>) {
    Object.assign(this, partial);
  }
}
