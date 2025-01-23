import { CreatePersonDocumentDto } from './createPersonDocument.dto';
import { IsNotEmpty, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';
import { PersonDocumentType } from 'src/entities/personDocument.entity';

export class UpdatePersonDocumentDto extends CreatePersonDocumentDto {
  @IsOptional()
  @IsString()
  documentType: PersonDocumentType;

  @IsOptional()
  @IsString()
  documentNumber: string;

  @IsOptional()
  @IsDate()
  documentExpirationDate?: Date;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
