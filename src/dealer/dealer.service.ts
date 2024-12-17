import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DealerEntity } from './dealer.entity';
import { CreateDealerDto } from './dtos/createDealer.dto';

@Injectable()
export class DealerService {
  constructor(
    @InjectRepository(DealerEntity)
    private readonly dealerRepository: Repository<DealerEntity>,
  ) {}

  async getDealers(): Promise<DealerEntity[]> {
    return this.dealerRepository.find();
  }

  async getDealerById(id: string): Promise<DealerEntity> {
    return this.dealerRepository.findOne({ where: { id } });
  }

  async createDealer(createDealerDto: CreateDealerDto): Promise<DealerEntity> {
    return await this.dealerRepository.save({
      ...createDealerDto,
      id: uuidv4(),
      isActive: true,
      isDeleted: false,
      isBlocked: false,
    });
  }

  async updateDealer(id: string, dealer: DealerEntity): Promise<DealerEntity> {
    await this.dealerRepository.update(id, dealer);
    return this.getDealerById(id);
  }

  async deleteDealer(id: string): Promise<void> {
    await this.dealerRepository.delete(id);
  }

  async getDealerByDocument(document: string): Promise<DealerEntity> {
    return this.dealerRepository.findOne({
      where: { enterpriseDocument: document },
    });
  }

  async getDealerByEmail(email: string): Promise<DealerEntity> {
    return this.dealerRepository.findOne({ where: { email } });
  }

  async getDealerByPhone(phone: string): Promise<DealerEntity> {
    return this.dealerRepository.findOne({ where: { phone } });
  }
}
