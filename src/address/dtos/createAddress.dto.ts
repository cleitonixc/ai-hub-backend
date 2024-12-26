import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  complement: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsNumber()
  @IsNotEmpty()
  cityId: number;
  
  @IsNumber()
  @IsNotEmpty()
  stateId: number;

  userId: string; 
}
