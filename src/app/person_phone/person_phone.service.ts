import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonPhoneEntity } from 'src/entities/personPhone.entity';
import { Repository } from 'typeorm';
import { PersonPhoneType } from 'src/entities/personPhone.entity';
import { CreatePersonPhoneDto } from './dtos/createPersonPhone.dto';
import { UpdatePersonPhoneDto } from './dtos/updatePersonPhone.dto';
@Injectable()
export class PersonPhoneService {
  constructor(
    @InjectRepository(PersonPhoneEntity)
    private readonly personPhoneRepository: Repository<PersonPhoneEntity>
  ) {}

  async createPersonPhone(personPhone: CreatePersonPhoneDto, userId: number, tenantId: number): Promise<PersonPhoneEntity> {
    const personPhoneCreated = await this.personPhoneRepository.save({
      ...personPhone,
      user: { id: userId },
      tenant: { id: tenantId },
      createdBy: userId,
    });
    return personPhoneCreated;
  }

  async getPersonPhone(personPhoneId: string): Promise<PersonPhoneEntity> {
    return this.personPhoneRepository.findOne({ where: { id: personPhoneId } });
  }

  // get all person phones
  async getPersonPhones(): Promise<PersonPhoneEntity[]> {
    return this.personPhoneRepository.find();
  }

  async updatePersonPhone(personPhoneId: string, updatePersonPhoneDto: UpdatePersonPhoneDto): Promise<PersonPhoneEntity> {
    return this.personPhoneRepository.save(updatePersonPhoneDto);
  }

  async deletePersonPhone(personPhoneId: string): Promise<void> {
    await this.personPhoneRepository.delete(personPhoneId);
  }

  async getPersonPhoneByPersonId(personId: string): Promise<PersonPhoneEntity[]> {
    return this.personPhoneRepository.find({ where: { person: { id: personId } } });
  }

  async getPersonPhoneByPersonIdAndPhoneType(personId: string, phoneType: PersonPhoneType): Promise<PersonPhoneEntity[]> {
    return this.personPhoneRepository.find({ where: { person: { id: personId }, phoneType } });
  }
}
