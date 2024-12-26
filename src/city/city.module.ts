import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';
import { CityService } from './city.service';
import { StateEntity } from '../state/state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity, StateEntity]),
  ],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {} 