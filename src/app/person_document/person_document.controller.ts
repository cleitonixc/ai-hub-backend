import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { PersonDocumentService } from './person_document.service';
import { ReturnPersonDocumentDto } from './dtos/returnPersonDocument.dto';
import { CreatePersonDocumentDto } from './dtos/createPersonDocument.dto';
import { UpdatePersonDocumentDto } from './dtos/updatePersonDocument.dto';

@Controller('person-document')
export class PersonDocumentController {
  constructor(private readonly personDocumentService: PersonDocumentService) {}

  @Post()
  async create(@Body() createPersonDocumentDto: CreatePersonDocumentDto): Promise<ReturnPersonDocumentDto> {
    const personDocument = await this.personDocumentService.create(createPersonDocumentDto);
    return new ReturnPersonDocumentDto(personDocument);
  }

  @Get()
  async findAll(): Promise<ReturnPersonDocumentDto[]> {
    return (await this.personDocumentService.findAll()).map(
      (personDocument) => new ReturnPersonDocumentDto(personDocument),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnPersonDocumentDto> {
    const personDocument = await this.personDocumentService.findOne(id);
    return new ReturnPersonDocumentDto(personDocument);
  }

  @Get('person/:personId')
  async findByPersonId(@Param('personId') personId: string): Promise<ReturnPersonDocumentDto[]> {
    return (await this.personDocumentService.findByPersonId(personId)).map(
      (personDocument) => new ReturnPersonDocumentDto(personDocument),
    );
  }

  @Get('document-number/:documentNumber')
  async findByDocumentNumber(@Param('documentNumber') documentNumber: string): Promise<ReturnPersonDocumentDto> {
    const personDocument = await this.personDocumentService.findByDocumentNumber(documentNumber);
    return new ReturnPersonDocumentDto(personDocument);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePersonDocumentDto: UpdatePersonDocumentDto): Promise<ReturnPersonDocumentDto> {
    const personDocument = await this.personDocumentService.update(id, updatePersonDocumentDto);
    return new ReturnPersonDocumentDto(personDocument);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.personDocumentService.delete(id);
  }
}
