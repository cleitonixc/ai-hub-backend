import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressCountryEntity } from 'src/entities/addressCountry.entity';

@Injectable()
export class AddressCountryService {
  constructor(
    @InjectRepository(AddressCountryEntity)
    private readonly addressCountryRepository: Repository<AddressCountryEntity>,
  ) {}

  async findAll(): Promise<AddressCountryEntity[]> {
    return this.addressCountryRepository.find();
  }

  async findById(id: number): Promise<AddressCountryEntity> {
    return this.addressCountryRepository.findOne({ where: { id } });
  }

  async create(addressCountryEntity: AddressCountryEntity): Promise<AddressCountryEntity> {
    return this.addressCountryRepository.save(addressCountryEntity);
  }
}
