import { Controller, Get } from '@nestjs/common';
import { AddressStateService } from './addressState.service';

@Controller('addressState')
export class AddressStateController {
  constructor(private readonly addressStateService: AddressStateService) {}

  @Get()
  async findAll() {
    return this.addressStateService.findAll();
  }
}
