import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/auth.bearer.guard';
import { AuthPayloadToken } from 'src/auth/auth.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalService } from './rental.service';
@Controller('rental')
@ApiTags('rental')
@UseGuards(AuthenticationGuard)
@ApiBearerAuth()
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  create(
    @Req() request,
    @Body(new ValidationPipe({ transform: true }))
    createRentalDto: CreateRentalDto,
  ) {
    const payload: AuthPayloadToken = request['token_payload'];
    return this.rentalService.create(payload.user_id, createRentalDto);
  }

  // @Get()
  // findAll() {
  //   return this.rentalService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
  //   return this.rentalService.update(+id, updateRentalDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rentalService.remove(+id);
  // }
}
