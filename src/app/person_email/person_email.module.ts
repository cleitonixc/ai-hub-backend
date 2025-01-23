import { Module } from '@nestjs/common';
import { PersonEmailService } from './person_email.service';
import { PersonEmailController } from './person_email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEmailEntity } from 'src/entities/personEmail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEmailEntity])],
  providers: [PersonEmailService],
  controllers: [PersonEmailController]
})
export class PersonEmailModule {}
