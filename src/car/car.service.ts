import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction } from 'sequelize';
import Car from 'src/database/models/Car';
import CarImage from 'src/database/models/CarImage';
import CarPrice from 'src/database/models/CarPrice';
import CarType from 'src/database/models/CarType';
import { GetCarsQueryParams } from './dto/search-car.dto';
import { CarEntity } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
  ) {}

  /**
   *
   * @param param
   */
  async search(param: GetCarsQueryParams) {
    const {
      search_car_name,
      capacityList,
      carTypeIdList,
      max_price,
      offset,
      limit,
    } = param;

    const whereClause: any = {
      available: true,
    };
    if (search_car_name && search_car_name.length > 0) {
      whereClause.name = {
        [Op.substring]: search_car_name,
      };
    }

    if (capacityList && capacityList.length > 0) {
      whereClause.capacity = { [Op.in]: capacityList };
    }

    if (carTypeIdList && carTypeIdList.length > 0) {
      whereClause.car_type_id = { [Op.in]: carTypeIdList };
    }
    const includeClause: any[] = [
      { model: CarType },
      {
        model: CarPrice,
        where: {
          effective_date: { [Op.lte]: new Date() },
          price_per_day: { [Op.lte]: max_price },
        },
        order: [['effective_date', 'DESC']],
      },
      {
        model: CarImage,
      },
    ];

    const [cars, totalItems] = await Promise.all([
      this.carModel.findAll({
        where: whereClause,
        include: includeClause,
        offset: offset,
        limit: limit,
      }),
      this.carModel.count({
        where: whereClause,
      }),
    ]);
    return {
      items: cars.map((item) => {
        const itemJson = item.toJSON();
        itemJson.car_price = item.car_prices[0];
        delete itemJson.car_prices;
        return itemJson;
      }),
      pagination: {
        total: totalItems,
        offset: offset,
        limit: limit,
      },
    };
  }
  /**
   *
   * @returns
   */
  findAll() {
    return this.carModel
      .findAll({
        where: {
          available: true,
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
      .then((cars) => {
        return cars.map((car) => {
          const car_price =
            car.car_prices.length > 0 ? car.car_prices[0] : null;
          return {
            ...car.toJSON(),
            car_price,
          };
        });
      });
  }

  findOne(id: number, t?: Transaction) {
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
        lock: t ? t.LOCK.UPDATE : false,
        transaction: t,
      })
      .then((car) => {
        if (car == null) {
          return null;
        }
        const car_price = car.car_prices.length > 0 ? car.car_prices[0] : null;
        return new CarEntity({
          ...car.toJSON(),
          car_price,
        });
      });
  }
  /**
   *
   * @param car_id
   * @param status
   * @param t
   */
  updateCarStatus(car_id: number, available: boolean, t?: Transaction) {
    this.carModel.update(
      {
        available: available,
      },
      {
        where: { id: car_id },
        transaction: t,
      },
    );
  }
}
