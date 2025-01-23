import { UserEntity, UserType } from 'src/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnTenantDto {
  @ApiProperty({
    description: 'ID do tenant',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Nome do tenant',
    example: 'Empresa XYZ'
  })
  name: string;

  @ApiProperty({
    description: 'Se é o tenant padrão do usuário',
    example: true
  })
  isDefault: boolean;
}

export class ReturnUserDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva'
  })
  name: string;
  

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '(11) 99999-9999',
    required: false
  })
  phone?: string;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2024-03-15T10:00:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Tipo do usuário',
    enum: UserType,
    example: UserType.USER
  })
  type: UserType;

  @ApiProperty({
    description: 'Nickname do usuário',
    example: 'joao.silva',
    required: false
  })
  nickname?: string;

  @ApiProperty({
    description: 'Lista de tenants aos quais o usuário pertence',
    type: [ReturnTenantDto],
    required: false,
    nullable: true
  })
  tenants?: ReturnTenantDto[];

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.nickname = user.nickname || undefined;
    this.email = user.email;
    this.type = user.type;
    this.tenants = user.userTenants?.length > 0 
      ? user.userTenants.map(ut => ({
          id: ut.tenant.id,
          name: ut.tenant.tenantName,
          isDefault: ut.isDefault
        }))
      : undefined;
  }
}
