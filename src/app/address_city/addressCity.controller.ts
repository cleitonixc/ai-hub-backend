import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressCityService } from './addressCity.service';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/entities/user.entity';
import { CreateAddressCityDto } from './dtos/createAddressCity.dto';

@Controller('addressCity')
export class AddressCityController {
  constructor(private readonly addressCityService: AddressCityService) {}

  @Get()
  async findAll() {
    return this.addressCityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.addressCityService.findOne(id);
  }

  @Roles(UserType.SUPER_ADMIN)
  @Post()
  async createCity(@Body() createAddressCityDto: CreateAddressCityDto) {
    return this.addressCityService.createCity(createAddressCityDto);
  }
}
