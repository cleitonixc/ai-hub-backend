import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AddressModule } from '../address/address.module';
import { AddressCityModule } from '../address_city/addressCity.module';
import { AddressStateModule } from '../address_state/addressState.module';
import { AddressCountryModule } from '../address_country/addressCountry.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AddressModule,
    AddressCityModule,
    AddressStateModule,
    AddressCountryModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

