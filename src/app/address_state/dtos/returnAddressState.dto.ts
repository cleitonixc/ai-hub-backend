import { AddressStateEntity } from 'src/entities/addressState.entity';

export class ReturnAddressStateDto {
  name: string;
  stateCode: string;
  phonePrefixes: string[];

  constructor(addressState: AddressStateEntity) {
    this.name = addressState.stateName;
    this.stateCode = addressState.stateCode;
    this.phonePrefixes = addressState.phonePrefixes;
  }
}