import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DealerEntity } from './dealer.entity';
import { DealerService } from './dealer.service';
import { CreateDealerDto } from './dtos/createDealer.dto';

@Controller('dealer')
export class DealerController {
  constructor(private readonly dealerService: DealerService) {}

  @Get()
  async getDealers(): Promise<DealerEntity[]> {
    return this.dealerService.getDealers();
  }

  @Get(':id')
  async getDealerById(@Param('id') id: string): Promise<DealerEntity> {
    return this.dealerService.getDealerById(id);
  }

  @Post()
  async createDealer(@Body() createDealerDto: CreateDealerDto): Promise<DealerEntity> {
    return this.dealerService.createDealer(createDealerDto);
  }

  @Delete(':id')
  async deleteDealer(@Param('id') id: string): Promise<void> {
    return this.dealerService.deleteDealer(id);
  }
}
