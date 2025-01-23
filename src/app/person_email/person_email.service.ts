import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEmailEntity } from 'src/entities/personEmail.entity';
import { CreatePersonEmailDto } from './dtos/createPersonEmail.dto';
import { UpdatePersonEmailDto } from './dtos/updatePersonEmail.dto';

@Injectable()
export class PersonEmailService {
  constructor(
    @InjectRepository(PersonEmailEntity)
    private readonly personEmailRepository: Repository<PersonEmailEntity>,
  ) {}

  async createPersonEmail(createPersonEmailDto: CreatePersonEmailDto): Promise<PersonEmailEntity> {
    const personEmail = this.personEmailRepository.create(createPersonEmailDto);
    return this.personEmailRepository.save(personEmail);
  }

  async updatePersonEmail(id: string, updatePersonEmailDto: UpdatePersonEmailDto): Promise<PersonEmailEntity> {
    const personEmail = await this.personEmailRepository.findOne({ where: { id } });
    this.personEmailRepository.merge(personEmail, updatePersonEmailDto);
    return this.personEmailRepository.save(personEmail);
  }

  async deletePersonEmail(id: string): Promise<void> {
    await this.personEmailRepository.delete(id);
  }

  async getPersonEmailById(id: string): Promise<PersonEmailEntity> {
    return this.personEmailRepository.findOne({ where: { id } });
  }

  async getPersonEmailByPersonId(personId: string): Promise<PersonEmailEntity[]> {
    return this.personEmailRepository.find({
      where: { person: { id: personId } },
    });
  }

  async getPersonEmailByEmail(email: string): Promise<PersonEmailEntity> {
    return this.personEmailRepository.findOne({ where: { email } });
  }
}
