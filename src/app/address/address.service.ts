import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from 'src/entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressStateService } from 'src/app/address_state/addressState.service';
import { AddressCityService } from 'src/app/address_city/addressCity.service';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly addressStateService: AddressStateService,
    private readonly addressCityService: AddressCityService,
  ) {}


  async findAll() {
    return this.addressRepository.find({
      relations: {
        city: true,
        state: true,
        location: true,
        street: true,
        building: true,
        user: true
      }
    });
  }

  async createAddress(createAddressDto: CreateAddressDto, userId: number) {
    await this.addressStateService.findStateById(createAddressDto.state);

    return this.addressRepository.save({
      user: { id: userId }
    });
  }

  async getAddressById(id: string): Promise<AddressEntity> {
    return this.addressRepository.findOne({
      where: { 
        id
      },
      relations: {
        city: true,
        state: true,
        location: true,
        street: true,
        building: true,
        user: true
      }
    });
  }

  async getAddressesByUserId(userId: number) {
    const addresses = await this.addressRepository.find({
      where: { user: { id: userId } },
      relations: {
        city: true,
        state: true,
        location: true,
        street: true,
        building: true,
        user: true
      }
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException('Address not found');
    }
    return addresses;
  }

}
function uuidv4() {
  throw new Error('Function not implemented.');
}

