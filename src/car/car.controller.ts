import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { CarService } from './car.service';
import { GetCarsQueryParams } from './dto/search-car.dto';
@ApiTags('car')
@Public()
@Controller('cars')
@ApiBasicAuth()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('search')
  searchAll(
    @Query(new ValidationPipe({ transform: true })) query: GetCarsQueryParams,
  ) {
    return this.carService.search(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carService.findOne(+id);
  }
}
