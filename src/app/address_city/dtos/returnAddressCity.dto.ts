import { AddressCityEntity } from 'src/entities/addressCity.entity';

export class ReturnAddressCityDto {
  id: number;
  name: string;

  constructor(addressCity: AddressCityEntity) {
    this.id = addressCity.id;
    this.name = addressCity.cityName;
  }
}