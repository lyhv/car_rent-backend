import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AuthService } from 'src/auth/auth.service';
import { LoginAuth, RegisterUser } from 'src/auth/dto/auth.dto';
import BillingInfo from 'src/database/models/BillingInfo';
import { User } from 'src/database/models/User';
import UserToken from 'src/database/models/UserToken';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private authService: AuthService,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(UserToken)
    private tokenModel: typeof UserToken,
    @InjectModel(BillingInfo)
    private billingInfoModel: typeof BillingInfo,
    private readonly sequelize: Sequelize,
  ) {}
  create(createUserDto: CreateUserDto, option?: CreateOptions): Promise<User> {
    return this.userModel.create({ ...createUserDto }, option);
  }

  findAll() {
    return `This action returns all users`;
  }
  /**
   *
   * @param userId
   * @returns
   */
  findAllBillingInfo(userId: number) {
    return this.billingInfoModel.findAll({
      where: {
        user_id: userId,
      },
    });
  }

  findOne(email: string): Promise<number | null> {
    return this.userModel
      .findOne({
        attributes: ['id'],
        where: {
          email: email,
        },
      })
      .then((result) => (result ? result.id : null));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validateUserToken(id: number, access_token: string) {
    const tokenId = await this.tokenModel.findOne({
      attributes: ['id'],
      where: {
        user_id: id,
        access_token: access_token,
      },
    });
    return tokenId != null;
  }

  async login(login: LoginAuth) {
    const user = await this.userModel.findOne({
      where: {
        email: login.email,
      },
    });
    if (user) {
      const isCorrectPassword = await bcrypt.compare(
        login.password,
        user.password,
      );
      if (isCorrectPassword) {
        const jwtToken = await this.authService.generateAppToken(
          {
            user_id: user.id,
          },
          parseInt(process.env.JWT_EXPIRES_IN),
        );
        // TODO save toke

        await this.tokenModel.update(jwtToken, {
          where: { user_id: user.id },
        });
        return new UserResponse({
          ...user.toJSON(),
          ...jwtToken,
          user_id: user.id,
        });
      } else {
        throw new UnauthorizedException('Password incorrect!');
      }
    } else {
      throw new BadRequestException('Email not exist!');
    }
  }
  async register(register: RegisterUser) {
    const { email } = register;
    const user = await this.findOne(email);
    if (!user) {
      const result = await this.sequelize.transaction(async (transaction) => {
        const newUser = await this.userModel.create(
          {
            ...register,
            user_role_id: 2,
          },
          { transaction: transaction },
        );
        const jwtToken = await this.authService.generateAppToken(
          {
            user_id: newUser.id,
          },
          parseInt(process.env.JWT_EXPIRES_IN),
        );
        const userToken = await this.tokenModel.create(
          {
            user_id: newUser.id,
            ...jwtToken,
          },
          { transaction: transaction },
        );
        const result = {
          ...newUser.toJSON(),
          ...userToken.toJSON(),
        };
        return result;
      });

      // If the execution reaches this line, the transaction has been committed successfully
      // `result` is whatever was returned from the transaction callback (the `user`, in this case)
      return new UserResponse(result);
    } else {
      throw new BadRequestException('Email already exist!');
    }
  }
}
