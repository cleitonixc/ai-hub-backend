import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from 'src/entities/person.entity';
import { CreatePersonDto } from './dtos/createPerson.dto';
import { UpdatePersonDto } from './dtos/updatePerson.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async createPerson(createPersonDto: CreatePersonDto, userId: number, tenantId: number): Promise<PersonEntity> { 
    const person = this.personRepository.create({
      ...createPersonDto,
      user: { id: userId },
      tenant: { id: tenantId },
      createdBy: userId,
    });
    return this.personRepository.save(person);
  }

  async getPersons(tenantId: number): Promise<PersonEntity[]> {
    return this.personRepository.find({ where: { tenant: { id: tenantId } } });
  }

  async updatePerson(id: string, updatePersonDto: UpdatePersonDto): Promise<PersonEntity> {
    const person = await this.personRepository.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    this.personRepository.merge(person, updatePersonDto); 
    return this.personRepository.save(person);
  }

  async deletePerson(id: string): Promise<void> {
    await this.personRepository.delete(id);
  }

  async getPersonById(id: string): Promise<PersonEntity> {
    return this.personRepository.findOne({ where: { id } });
  }

  async getPersonByUserId(userId: number): Promise<PersonEntity> {
    return this.personRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

}
