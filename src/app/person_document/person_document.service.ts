import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonDocumentEntity } from 'src/entities/personDocument.entity';
import { CreatePersonDocumentDto } from './dtos/createPersonDocument.dto';
import { UpdatePersonDocumentDto } from './dtos/updatePersonDocument.dto';
import { NotFoundException, ConflictException } from '@nestjs/common';

@Injectable()
export class PersonDocumentService {
  constructor(
    @InjectRepository(PersonDocumentEntity)
    private readonly personDocumentRepository: Repository<PersonDocumentEntity>,
  ) {}

  async create(createPersonDocumentDto: CreatePersonDocumentDto) {
    const documentNumberAlreadyExists = await this.personDocumentRepository.findOne({
      where: { documentNumber: createPersonDocumentDto.documentNumber },
    });
    if (documentNumberAlreadyExists) {
      throw new ConflictException('Document number already exists');
    }
    const personDocument = this.personDocumentRepository.create(createPersonDocumentDto);
    return await this.personDocumentRepository.save(personDocument);
  }

  async update(id: string, updatePersonDocumentDto: UpdatePersonDocumentDto) {
    const personDocument = await this.personDocumentRepository.findOne({ where: { id } });
    if (!personDocument) {
      throw new NotFoundException('Person document not found');
    }
    return await this.personDocumentRepository.save({ ...personDocument, ...updatePersonDocumentDto });
  }

  async delete(id: string) {
    const personDocument = await this.personDocumentRepository.findOne({ where: { id } });
    if (!personDocument) {
      throw new NotFoundException('Person document not found');
    }
    await this.personDocumentRepository.remove(personDocument);
  }

  async findAll() {
    return await this.personDocumentRepository.find();
  }

  async findOne(id: string) {
    return await this.personDocumentRepository.findOne({ where: { id } });
  }

  async findByPersonId(personId: string) {
    return await this.personDocumentRepository.find({ where: { person: { id: personId } } });
  }

  async findByDocumentNumber(documentNumber: string) {
    return await this.personDocumentRepository.findOne({ where: { documentNumber } });
  }
}
