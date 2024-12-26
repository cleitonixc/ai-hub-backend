import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from './state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async findAll() {
    return this.stateRepository.find();
  }

  async findStateById(id: number) {
    const state = await this.stateRepository.findOne({ 
      where: { id }
    });

    if (!state) {
      throw new NotFoundException(`State #${id} not found`);
    }

    return state;
  }
}
