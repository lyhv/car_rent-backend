import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { BasicAuthGuard } from 'src/auth/auth.basic.gurard';
import { AuthenticationGuard } from 'src/auth/auth.bearer.guard';
import { CarService } from './car.service';
import { GetCarsQueryParams } from './dto/search-car.dto';
import { CarEntity } from './entities/car.entity';
@ApiTags('car')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  // @Post()
  // create(@Body() createCarDto: CreateCarDto) {
  //   return this.carService.create(createCarDto);
  // }
  @Get('search')
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  searchAll(
    @Query(new ValidationPipe({ transform: true })) query: GetCarsQueryParams,
  ) {
    return this.carService.search(query);
  }

  @Get()
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  findAll() {
    return plainToClass(CarEntity, this.carService.findAll());
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
  //   return this.carService.update(+id, updateCarDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.carService.remove(+id);
  // }
}
