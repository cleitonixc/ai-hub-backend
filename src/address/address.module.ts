import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';
import { UserModule } from '../user/user.module';
import { AddressController } from './address.controller';
import { StateModule } from '../state/state.module';
import { CityModule } from '../city/city.module';
import { CityEntity } from '../city/city.entity';
import { StateEntity } from '../state/state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity, CityEntity, StateEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => StateModule),
    forwardRef(() => CityModule),
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
