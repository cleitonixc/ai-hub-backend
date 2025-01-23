import { Module } from '@nestjs/common';
import { PersonDocumentService } from './person_document.service';
import { PersonDocumentController } from './person_document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonDocumentEntity } from 'src/entities/personDocument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonDocumentEntity])],
  providers: [PersonDocumentService],
  controllers: [PersonDocumentController],
  exports: [PersonDocumentService],
})
export class PersonDocumentModule {}
