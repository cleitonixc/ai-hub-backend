import { IsString, IsNotEmpty, IsBoolean, IsDate } from 'class-validator';

export class CreateAddressCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDeleted: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}