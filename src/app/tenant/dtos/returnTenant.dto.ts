import { TenantEntity } from 'src/entities/tenant.entity';

export class ReturnTenantDto {
  id: number;
  name: string;
  isDefault: boolean;

  constructor(tenant: TenantEntity) {
    this.id = tenant.id;
    this.name = tenant.tenantName;
    this.isDefault = tenant.isDefault;
  }
}
