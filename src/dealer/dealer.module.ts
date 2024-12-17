import { Module } from '@nestjs/common';
import { DealerController } from './dealer.controller';
import { DealerService } from './dealer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealerEntity } from './dealer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DealerEntity])],
  controllers: [DealerController],
  providers: [DealerService],
})
export class DealerModule {}
