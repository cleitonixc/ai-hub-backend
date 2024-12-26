import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from './state.entity';
import { StateService } from './state.service';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}
