import { ReturnAddressDto } from '../../address/dtos/returnAddress.dto';
import { UserEntity, UserType } from '../user.entity';

export class ReturnUserDto {
  id: string;
  name: string;
  email: string;
  type: UserType;
  addresses?: ReturnAddressDto[];
  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.type = user.type;
    this.addresses = user.addresses
    ? user.addresses.map((address) => new ReturnAddressDto(address))
    : undefined;
  }

  
}