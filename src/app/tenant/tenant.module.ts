import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from 'src/entities/tenant.entity';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  providers: [TenantService],
  controllers: [TenantController],
})
export class TenantModule {}
