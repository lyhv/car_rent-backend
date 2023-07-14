import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';
import { AuthPayloadToken } from 'src/auth/auth.service';
import { Private } from 'src/auth/public.decorator';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalService } from './rental.service';
@Controller('rental')
@ApiTags('rental')
@ApiBearerAuth()
@Private()
export class RentalController {
  constructor(
    private readonly rentalService: RentalService,
    @InjectQueue('rental') private rentalQueue: Queue,
  ) {}

  @Post()
  create(
    @Req() request,
    @Body(new ValidationPipe({ transform: true }))
    createRentalDto: CreateRentalDto,
  ) {
    const payload: AuthPayloadToken = request['token_payload'];
    return this.rentalService.create(payload.user_id, createRentalDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalService.findOne(+id);
  }
}
