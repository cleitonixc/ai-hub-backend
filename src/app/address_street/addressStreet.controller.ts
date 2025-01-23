import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AddressStreetService } from "./addressStreet.service";
import { AddressStreetEntity } from "src/entities/addressStreet.entity";

@Controller('address-street')
export class AddressStreetController {
  constructor(private readonly addressStreetService: AddressStreetService) {}

  @Get()
  async findAll(): Promise<AddressStreetEntity[]> {
    return this.addressStreetService.findAll();
  }


}
