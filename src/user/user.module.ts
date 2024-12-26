import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AddressModule } from '../address/address.module';
import { CityModule } from '../city/city.module';
import { StateModule } from '../state/state.module';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AddressModule,
    CityModule,
    StateModule,
    CountryModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

