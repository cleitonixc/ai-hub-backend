import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/entities/address.entity';
import { AddressService } from './address.service';
import { UserModule } from 'src/app/user/user.module';
import { AddressController } from './address.controller';
import { AddressStateModule } from 'src/app/address_state/addressState.module';
import { AddressCityModule } from 'src/app/address_city/addressCity.module';
import { AddressCityEntity } from 'src/entities/addressCity.entity';
import { AddressStateEntity } from 'src/entities/addressState.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity, AddressCityEntity, AddressStateEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => AddressStateModule),
    forwardRef(() => AddressCityModule),
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
