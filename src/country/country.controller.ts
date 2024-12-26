import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dtos/createCountry.dto';
import { CountryEntity } from './country.entity';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.countryService.findById(id);
  }

  @Post()
  create(@Body() countryEntity: CountryEntity) {
    return this.countryService.create(countryEntity);
  }
}
