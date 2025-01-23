import { Controller, Post, Put, Delete, Get, Param, Body } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dtos/createPerson.dto';
import { UpdatePersonDto } from './dtos/updatePerson.dto';
import { ReturnPersonDto } from './dtos/returnPerson.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/entities/user.entity';
import { UserId } from 'src/decorators/user-id-decorator';
import { TenantId } from 'src/decorators/tenant-id-decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Roles(
  UserType.ADMIN,
)
@ApiTags('Person')
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 201,
  description: 'Person criado com sucesso',
  type: ReturnPersonDto
})
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async createPerson(@Body() createPersonDto: CreatePersonDto, @UserId() userId: number, @TenantId() tenantId: number): Promise<ReturnPersonDto> {
    const personCreated = await this.personService.createPerson(createPersonDto, userId, tenantId);
    return new ReturnPersonDto(personCreated);
  }

  @Get()
  async getPersons(@TenantId() tenantId: number): Promise<ReturnPersonDto[]> {
    const persons = await this.personService.getPersons(tenantId);
    return persons.map(person => new ReturnPersonDto(person));
  }

  @Put(':id')
  async updatePerson(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto): Promise<ReturnPersonDto> {
    const personUpdated = await this.personService.updatePerson(id, updatePersonDto);
    return new ReturnPersonDto(personUpdated);
  }

  @Delete(':id')
  deletePerson(@Param('id') id: string) {
    return this.personService.deletePerson(id);
  }

  @Get(':id')
  async getPersonById(@Param('id') id: string): Promise<ReturnPersonDto> {
    const person = await this.personService.getPersonById(id);
    return new ReturnPersonDto(person);
  }

  @Get('user/:userId')
  async getPersonByUserId(@Param('userId') userId: number): Promise<ReturnPersonDto> {
    const person = await this.personService.getPersonByUserId(userId);
    return new ReturnPersonDto(person);
  }
}
