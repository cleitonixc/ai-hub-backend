import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
