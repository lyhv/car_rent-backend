import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import Car from 'src/database/models/Car';
import CarImage from 'src/database/models/CarImage';
import CarPrice from 'src/database/models/CarPrice';
import CarType from 'src/database/models/CarType';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
    @InjectModel(CarType)
    private carTypeModel: typeof CarType,
    private readonly sequelize: Sequelize,
  ) {}
  create(createCarDto: CreateCarDto) {
    return 'This action adds a new car';
  }

  findAll() {
    return this.carModel.findAll();
  }

  findOne(id: number) {
    return this.carModel
      .findOne({
        where: {
          id: id,
        },
        include: [
          CarType,
          {
            model: CarPrice,
            where: {
              effective_date: {
                [Op.lte]: new Date(),
              },
            },
            order: [['effective_date', 'DESC']],
            limit: 1,
          },
          {
            model: CarImage,
            order: [['created_at', 'DESC']],
          },
        ],
      })
      .then((car) => {
        const car_price = car.car_prices.length > 0 ? car.car_prices[0] : null;
        return {
          ...car.toJSON(),
          car_price,
        };
      });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
