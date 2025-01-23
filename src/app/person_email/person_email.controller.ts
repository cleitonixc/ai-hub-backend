import { Controller, Post, Put, Delete, Get, Param, Body } from '@nestjs/common';
import { PersonEmailService } from './person_email.service';
import { CreatePersonEmailDto } from './dtos/createPersonEmail.dto';
import { UpdatePersonEmailDto } from './dtos/updatePersonEmail.dto';
import { ReturnPersonEmailDto } from './dtos/returnPersonEmail.dto';

@Controller('person-email')
export class PersonEmailController {
  constructor(private readonly personEmailService: PersonEmailService) {}

  @Post()
  async createPersonEmail(@Body() createPersonEmailDto: CreatePersonEmailDto): Promise<ReturnPersonEmailDto> {
    const personEmailCreated = await this.personEmailService.createPersonEmail(createPersonEmailDto);
    return new ReturnPersonEmailDto(personEmailCreated);
  }

  @Put(':id')
  async updatePersonEmail(@Param('id') id: string, @Body() updatePersonEmailDto: UpdatePersonEmailDto): Promise<ReturnPersonEmailDto> {
    const personEmailUpdated = await this.personEmailService.updatePersonEmail(id, updatePersonEmailDto);
    return new ReturnPersonEmailDto(personEmailUpdated);
  }

  @Delete(':id')
  async deletePersonEmail(@Param('id') id: string): Promise<void> {
    await this.personEmailService.deletePersonEmail(id);
  }

  @Get(':id')
  async getPersonEmailById(@Param('id') id: string): Promise<ReturnPersonEmailDto> {
    const personEmail = await this.personEmailService.getPersonEmailById(id);
    return new ReturnPersonEmailDto(personEmail);
  }

  @Get('person/:personId')
  async getPersonEmailByPersonId(@Param('personId') personId: string): Promise<ReturnPersonEmailDto[]> {
    const personEmails = await this.personEmailService.getPersonEmailByPersonId(personId);
    return personEmails.map(personEmail => new ReturnPersonEmailDto(personEmail));
  }

  @Get('email/:email')
  async getPersonEmailByEmail(@Param('email') email: string): Promise<ReturnPersonEmailDto> {
    const personEmail = await this.personEmailService.getPersonEmailByEmail(email);
    return new ReturnPersonEmailDto(personEmail);
  }
}
