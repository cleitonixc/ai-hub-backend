import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './country.entity';
import { CreateCountryDto } from './dtos/createCountry.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  async findAll(): Promise<CountryEntity[]> {
    return this.countryRepository.find();
  }

  async findById(id: number): Promise<CountryEntity> {
    return this.countryRepository.findOne({ where: { id } });
  }

  async create(countryEntity: CountryEntity): Promise<CountryEntity> {
    return this.countryRepository.save(countryEntity);
  }
}
