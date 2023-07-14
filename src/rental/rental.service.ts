import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CarService } from 'src/car/car.service';
import BillingInfo from 'src/database/models/BillingInfo';
import Car from 'src/database/models/Car';
import Location from 'src/database/models/Location';
import Payment from 'src/database/models/Payment';
import Rental from 'src/database/models/Rental';
import RentalStatus from 'src/database/models/RentalStatus';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Injectable()
export class RentalService {
  constructor(
    private carService: CarService,
    @InjectModel(Rental)
    private rentalModel: typeof Rental,
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
    private readonly sequelize: Sequelize,
  ) {}
  async create(userId: number, createRentalDto: CreateRentalDto) {
    const isCarValid = await this.carService.isCarValid(createRentalDto.car_id);
    if (!isCarValid) {
      throw Error('Car is unavailable!');
    }
    const carDetail = await this.carService.findOne(createRentalDto.car_id);
    const data = await this.sequelize.transaction(async (transaction) => {
      const payment_method_id = createRentalDto.payment_method_id;
      delete createRentalDto.payment_method_id;
      const rawCreateRental = {
        user_id: userId,
        ...createRentalDto,
        rental_status_id: 1,
        car_price_id: carDetail.car_price.id,
      };
      const rental = await this.rentalModel.create(rawCreateRental, {
        transaction: transaction,
      });

      const paymentDto: CreatePaymentDto = {
        rental_id: rental.id,
        payment_amount:
          createRentalDto.getTotalRentalDays() *
          carDetail.car_price.price_per_day,
        payment_date: new Date(),
        payment_method_id: payment_method_id,
        payment_status_id: 1,
      };

      const payment = await this.paymentModel.create(
        { ...paymentDto },
        {
          transaction: transaction,
        },
      );
      return {
        ...rental.toJSON(),
        payment,
      };
    });
    return data;
  }

  findAll() {
    return `This action returns all rental`;
  }

  findOne(id: number) {
    const includeModel = [
      {
        model: Location,
        as: 'location_pick_up',
      },
      {
        model: Location,
        as: 'location_drop',
      },
      {
        model: Car,
        as: 'car',
      },
      {
        model: BillingInfo,
        as: 'billing_info',
      },
      {
        model: RentalStatus,
        as: 'rental_status',
      },
      {
        model: Payment,
        as: 'payment',
      },
    ];
    const data = this.rentalModel.findOne({
      where: {
        id: id,
      },
      include: includeModel,
    });
    return data;
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental`;
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}
