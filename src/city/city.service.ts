import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './city.entity';
import { CreateCityDto } from './dtos/createCity.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async findAll() {
    return this.cityRepository.find();
  }

  async findOne(id: string) {
    return this.cityRepository.findOne({ where: { id: Number(id) } });
  }

  async getAllByStateId(stateId: string) {
    return this.cityRepository.find({ where: { stateId: Number(stateId) } });
  }

  async findCityById(id: number) {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException(`City #${id} not found`);
    }

    return city;
  }

  async findCityByIdAndStateId(cityId: number, stateId: number) {
    const city = await this.cityRepository.findOneBy({ 
      id: cityId, 
      stateId: stateId 
    });

    if (!city) {
      throw new NotFoundException(`City #${cityId} not found in state #${stateId}`);
    }

    return city;
  }

  async createCity(createCityDto: CreateCityDto) {
    return this.cityRepository.save(createCityDto);
  }
}
