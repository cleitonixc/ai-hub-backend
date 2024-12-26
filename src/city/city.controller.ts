import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { Roles } from '../decorators/roles.decorators';
import { UserType } from '../user/user.entity';
import { CreateCityDto } from './dtos/createCity.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Get('state/:stateId')
  async getAllByStateId(@Param('stateId') stateId: string) {
    return this.cityService.getAllByStateId(stateId);
  }

  @Roles(UserType.SUPER_ADMIN)
  @Post()
  async createCity(@Body() createCityDto: CreateCityDto) {
    return this.cityService.createCity(createCityDto);
  }
}
