import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { RentalService } from './rental.service';

@Processor('rental')
export class RentalProcessor {
  constructor(private readonly rentalService: RentalService) {}

  @Process('sendMailCreateRental')
  async createOrder(job: Job) {
    // TODO send mail
  }
}
