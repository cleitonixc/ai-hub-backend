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
  async createDealer(@Body() dealer: DealerEntity): Promise<DealerEntity> {
    return this.dealerService.createDealer(dealer);
  }

  @Put(':id')
  async updateDealer(
    @Param('id') id: string,
    @Body() dealer: DealerEntity,
  ): Promise<DealerEntity> {
    return this.dealerService.updateDealer(id, dealer);
  }

  @Delete(':id')
  async deleteDealer(@Param('id') id: string): Promise<void> {
    return this.dealerService.deleteDealer(id);
  }
}
