import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressStateEntity } from 'src/entities/addressState.entity';

@Injectable()
export class AddressStateService {
  constructor(
    @InjectRepository(AddressStateEntity)
    private readonly addressStateRepository: Repository<AddressStateEntity>,
  ) {}

  async findAll() {
    return this.addressStateRepository.find();
  }

  async findStateById(id: number) {
    const state = await this.addressStateRepository.findOne({ 
      where: { id }
    });

    if (!state) {
      throw new NotFoundException(`State #${id} not found`);
    }

    return state;
  }
}
