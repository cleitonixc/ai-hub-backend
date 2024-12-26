import { ReturnCityDto } from '../../city/dtos/returnCity.dto';
import { AddressEntity } from '../address.entity';

export class ReturnAddressDto {
  id: number;
  street: string;
  number: string;
  complement: string;
  zipCode: string;
  city?: ReturnCityDto;
  constructor(address: AddressEntity) {
    this.id = address.id;
    this.street = address.street;
    this.number = address.number;
    this.complement = address.complement;
    this.zipCode = address.zipCode;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
