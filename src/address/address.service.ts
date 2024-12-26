import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { StateService } from '../state/state.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly stateService: StateService,
    private readonly cityService: CityService,
  ) {}

  async findAll() {
    return this.addressRepository.find({
      relations: {
        city: {
          state: true
        }
      }
    });
  }

  async createAddress(createAddressDto: CreateAddressDto, userId: number) {
    await this.stateService.findStateById(createAddressDto.stateId);
    await this.cityService.findCityByIdAndStateId(createAddressDto.cityId, createAddressDto.stateId);
    return this.addressRepository.save({
      ...createAddressDto,
      userId
    });
  }

  async getAddressById(id: number): Promise<AddressEntity> {
    return this.addressRepository.findOne({
      where: { 
        id
      },
      relations: {
        city: {
          state: true
        }
      }
    });
  }

  async getAddressesByUserId(userId: string) {
    const addresses = await this.addressRepository.find({
      where: { user: { id: userId } },
      relations: {
        city: { state: true }
      }
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException('Address not found');
    }
    return addresses;
  }

}
