import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from 'src/entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
  ) {}

  async createTenant(tenant: TenantEntity): Promise<TenantEntity> {
    return this.tenantRepository.save(tenant);
  }

  async getTenantById(id: number): Promise<TenantEntity> {
    return this.tenantRepository.findOne({ where: { id } });
  }

  async updateTenant(id: number, tenant: TenantEntity): Promise<TenantEntity> {
    await this.tenantRepository.update(id, tenant);
    return this.getTenantById(id);
  }

  async deleteTenant(id: number): Promise<void> {
    await this.tenantRepository.delete(id);
  }

  async getTenants(): Promise<TenantEntity[]> {
    return this.tenantRepository.find();
  }
}
