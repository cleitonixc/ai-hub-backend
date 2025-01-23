import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddressStreetEntity } from "src/entities/addressStreet.entity";

@Injectable()
export class AddressStreetService {
  constructor(
    @InjectRepository(AddressStreetEntity)
    private readonly addressStreetRepository: Repository<AddressStreetEntity>,
  ) {}

  async findAll(): Promise<AddressStreetEntity[]> {
    return this.addressStreetRepository.find();
  }

  async create(addressStreet: AddressStreetEntity): Promise<AddressStreetEntity> {
    return this.addressStreetRepository.save(addressStreet);
  }
} 
