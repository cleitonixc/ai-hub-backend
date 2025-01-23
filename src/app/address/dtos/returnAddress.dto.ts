import { AddressStreetEntity } from 'src/entities/addressStreet.entity';
import { ReturnAddressCityDto } from '../../address_city/dtos/returnAddressCity.dto';
import { AddressEntity } from 'src/entities/address.entity';

export class ReturnAddressDto {
  street: AddressStreetEntity;
  number: string;
  complement: string;
  postalCode: string;
  city?: ReturnAddressCityDto;
  constructor(address: AddressEntity) {
    this.street = address.street;
    this.number = address.number;
    this.complement = address.complement;
    this.postalCode = address.postalCode;
    this.city = address.city ? new ReturnAddressCityDto(address.city) : undefined;
  }
}
