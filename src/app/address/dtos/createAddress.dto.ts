import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  building: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  city: number;

  @IsNotEmpty()
  state: number;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  country: number;

  @IsNotEmpty()
  postalCode: string;
}
