import { ReturnAddressDto } from '../../address/dtos/returnAddress.dto';
import { DealerEntity } from '../dealer.entity';

export class ReturnDealerDto {
  id: string;
  name: string;
  enterpriseDocument: string;
  email: string;
  phone: string;
  address: ReturnAddressDto;

  constructor(dealer: DealerEntity) {
    this.id = dealer.id;
    this.name = dealer.name;
    this.enterpriseDocument = dealer.enterpriseDocument;
    this.email = dealer.email;
    this.phone = dealer.phone;
    this.address = new ReturnAddressDto(dealer.address);
  }
}
