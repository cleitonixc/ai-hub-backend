import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { ReturnAddressDto } from './dtos/returnAddress.dto';
import { UserType } from '../user/user.entity';
import { Roles } from '../decorators/roles.decorators';
import { UserId } from '../decorators/user-id-decorator';

@Roles(
  UserType.ADMIN,
)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async findAll() : Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAll()).map(
      (address) => new ReturnAddressDto(address)
    );
  }

  @Get(':id')
  async getAddressById(@Param('id') id: number): Promise<ReturnAddressDto> {
    return new ReturnAddressDto(await this.addressService.getAddressById(id));
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(@Body() createAddressDto: CreateAddressDto, @UserId() userId: number) {
    return this.addressService.createAddress(createAddressDto, userId);
  }
}
