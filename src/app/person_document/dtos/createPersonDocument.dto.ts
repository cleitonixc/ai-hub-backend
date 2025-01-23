import { IsNotEmpty, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';
import { PersonDocumentType } from 'src/entities/personDocument.entity';

export class CreatePersonDocumentDto {
  @IsNotEmpty()
  @IsString()
  documentType: PersonDocumentType;

  @IsNotEmpty()
  @IsString()
  documentNumber: string;

  @IsOptional()
  @IsDate()
  documentExpirationDate?: Date;

  //to do user id
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  //createdBy
  @IsNotEmpty()
  @IsNumber()
  createdBy: number;
}
