import { ReturnTenantDto } from "src/app/tenant/dtos/returnTenant.dto";
import { UserEntity, UserType } from "src/entities/user.entity";

export class LoginPayloadDto {
  id: number;
  email: string;
  name: string;
  nickname?: string;
  type: UserType;
  tenants: ReturnTenantDto[];
  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.nickname = user.nickname ?? null;
    this.type = user.type;
    this.tenants = user.userTenants?.map(ut => new ReturnTenantDto(ut.tenant)) || [];
  }
}