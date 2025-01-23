import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { PersonPhoneService } from './person_phone.service';
import { CreatePersonPhoneDto } from './dtos/createPersonPhone.dto';
import { ReturnPersonPhoneDto } from './dtos/returnPersonPhone.dto';
import { UpdatePersonPhoneDto } from './dtos/updatePersonPhone.dto';
import { PersonPhoneType } from 'src/entities/personPhone.entity';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/entities/user.entity';
import { UserId } from 'src/decorators/user-id-decorator';
import { TenantId } from 'src/decorators/tenant-id-decorator';
import { ValidationPipe, UsePipes } from '@nestjs/common';

@Roles(
  UserType.ADMIN,
)
@Controller('person-phone')
export class PersonPhoneController {
  constructor(private readonly personPhoneService: PersonPhoneService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPersonPhone(@Body() createPersonPhoneDto: CreatePersonPhoneDto, @UserId() userId: number, @TenantId() tenantId: number): Promise<ReturnPersonPhoneDto> {
    const personPhoneCreated = await this.personPhoneService.createPersonPhone(createPersonPhoneDto, userId, tenantId);
    return new ReturnPersonPhoneDto(personPhoneCreated);
  }

  @Get(':personPhoneId')
  async getPersonPhone(@Param('personPhoneId') personPhoneId: string): Promise<ReturnPersonPhoneDto> {
    return this.personPhoneService.getPersonPhone(personPhoneId);
  }

  @Get()
  async getPersonPhones(): Promise<ReturnPersonPhoneDto[]> {
    return this.personPhoneService.getPersonPhones();
  }

  @Put(':personPhoneId')
  async updatePersonPhone(@Param('personPhoneId') personPhoneId: string, @Body() updatePersonPhoneDto: UpdatePersonPhoneDto): Promise<ReturnPersonPhoneDto> {
    const personPhoneUpdated = await this.personPhoneService.updatePersonPhone(personPhoneId, updatePersonPhoneDto);
    return new ReturnPersonPhoneDto(personPhoneUpdated);
  }

  @Delete(':personPhoneId')
  async deletePersonPhone(@Param('personPhoneId') personPhoneId: string): Promise<void> {
    return this.personPhoneService.deletePersonPhone(personPhoneId);
  }

  @Get('person/:personId')
  async getPersonPhonesByPersonId(@Param('personId') personId: string): Promise<ReturnPersonPhoneDto[]> {
    return this.personPhoneService.getPersonPhoneByPersonId(personId);
  }

  @Get('person/:personId/type/:phoneType')
  async getPersonPhonesByPersonIdAndPhoneType(@Param('personId') personId: string, @Param('phoneType') phoneType: PersonPhoneType): Promise<ReturnPersonPhoneDto[]> {
    return this.personPhoneService.getPersonPhoneByPersonIdAndPhoneType(personId, phoneType);
  }
}
