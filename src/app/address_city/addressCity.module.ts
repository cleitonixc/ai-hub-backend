import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressCityEntity } from 'src/entities/addressCity.entity';
import { AddressCityService } from './addressCity.service';
import { AddressStateEntity } from 'src/entities/addressState.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressCityEntity, AddressStateEntity]),
  ],
  providers: [AddressCityService],
  exports: [AddressCityService],
})
export class AddressCityModule {} 