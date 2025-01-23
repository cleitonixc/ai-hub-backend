import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressCountryService } from './addressCountry.service';
import { AddressCountryEntity } from 'src/entities/addressCountry.entity';

@Controller('addressCountry')
export class AddressCountryController {
  constructor(private readonly addressCountryService: AddressCountryService) {}

  @Get()
  findAll() {
    return this.addressCountryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.addressCountryService.findById(id);
  }

  @Post()
  create(@Body() addressCountryEntity: AddressCountryEntity) {
    return this.addressCountryService.create(addressCountryEntity);
  }
}
