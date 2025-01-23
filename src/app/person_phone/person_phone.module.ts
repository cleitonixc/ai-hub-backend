import { Module } from '@nestjs/common';
import { PersonPhoneService } from './person_phone.service';
import { PersonPhoneController } from './person_phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonPhoneEntity } from 'src/entities/personPhone.entity';
import { PersonModule } from '../person/person.module';
@Module({
  providers: [PersonPhoneService],
  controllers: [PersonPhoneController],
  exports: [PersonPhoneService],
  imports: [
    TypeOrmModule.forFeature([PersonPhoneEntity]),
    PersonModule
  ]
})
export class PersonPhoneModule {}
