import { IsNotEmpty } from 'class-validator';

export class CreateAddressCityDto {
  @IsNotEmpty()
  cityName: string;

  @IsNotEmpty()
  cityCode: string;

  @IsNotEmpty()
  tomCode: string;
}
