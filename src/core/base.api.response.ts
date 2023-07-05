import { Exclude, plainToClass } from 'class-transformer';
@Exclude()
export class BaseApiResponse {
  constructor(partial: Partial<BaseApiResponse>) {
    Object.assign(this, plainToClass(BaseApiResponse, partial));
  }
}
