import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressCityEntity } from 'src/entities/addressCity.entity';
import { CreateAddressCityDto } from './dtos/createAddressCity.dto';

@Injectable()
export class AddressCityService {
  constructor(
    @InjectRepository(AddressCityEntity)
    private readonly addressCityRepository: Repository<AddressCityEntity>,
  ) {}

  async findAll() {
    return this.addressCityRepository.find();
  }

  async findOne(id: string) {
    return this.addressCityRepository.findOne({ where: { id: Number(id) } });
  }

  async findCityById(id: number) {
    const city = await this.addressCityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException(`City #${id} not found`);
    }

    return city;
  }


  async createCity(createAddressCityDto: CreateAddressCityDto) {
    return this.addressCityRepository.save(createAddressCityDto);
  }
}
