import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  @IsString()
  tenantName: string;

  @IsNotEmpty()
  @IsString()
  tenantPhone: string;

  @IsNotEmpty()
  @IsString()
  tenantEmail: string;

  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;

}
