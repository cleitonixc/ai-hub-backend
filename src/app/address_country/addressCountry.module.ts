import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressCountryEntity } from 'src/entities/addressCountry.entity';
import { AddressCountryService } from './addressCountry.service';
import { AddressCountryController } from './addressCountry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AddressCountryEntity])],
  providers: [AddressCountryService],
  controllers: [AddressCountryController],
})
export class AddressCountryModule {}
