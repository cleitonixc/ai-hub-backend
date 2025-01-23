import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressStateEntity } from 'src/entities/addressState.entity';
import { AddressStateService } from './addressState.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressStateEntity])],
  providers: [AddressStateService],
  exports: [AddressStateService],
})
export class AddressStateModule {}
