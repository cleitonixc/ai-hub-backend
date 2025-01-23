import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressStreetDto {
  @IsString()
  @IsNotEmpty()
  streetName: string;
}