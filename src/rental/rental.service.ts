import { BadRequestException, Injectable } from '@nestjs/common';
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
import { RentalHistoryDto } from './dto/create-rental_history.dto';

@Injectable()
export class RentalService {
  constructor(
    private carService: CarService,
    @InjectModel(Rental)
    private rentalModel: typeof Rental,
    @InjectModel(Rental)
    private rentalHistory: typeof Rental,
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
    private readonly sequelize: Sequelize,
  ) {}

  async create(userId: number, createRentalDto: CreateRentalDto) {
    const rental_id = await this.sequelize.transaction(async (t) => {
      // Get Car by id and check is available
      const carDetail = await this.carService.findOne(
        createRentalDto.car_id,
        t,
      );
      if (!carDetail || !carDetail.available) {
        throw BadRequestException('Car is unavailable!');
      }
      const payment_method_id = createRentalDto.payment_method_id;
      delete createRentalDto.payment_method_id;
      const rawCreateRental = {
        user_id: userId,
        ...createRentalDto,
        car_price_id: carDetail.car_price.id,
      };
      // Create rental order
      const rental = await this.rentalModel.create(rawCreateRental, {
        transaction: t,
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
      const rentalHistoryDto: RentalHistoryDto = {
        rental_id: rental.id,
        rental_status_id: 1,
        changed_by_user_id: userId,
      };
      // Create Rental History
      await this.rentalHistory.create(
        { ...rentalHistoryDto },
        { transaction: t },
      );
      // Create Payment Status
      await this.paymentModel.create(
        { ...paymentDto },
        {
          transaction: t,
        },
      );
      // Lock this Car
      await this.carService.updateCarStatus(carDetail.id, false, t);
      return rental.id;
    });
    return { rental_id };
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
}
