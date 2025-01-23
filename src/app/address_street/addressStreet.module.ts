import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressStreetEntity } from "src/entities/addressStreet.entity";
import { AddressStreetController } from "./addressStreet.controller";
import { AddressStreetService } from "./addressStreet.service";

@Module({
  imports: [TypeOrmModule.forFeature([AddressStreetEntity])],
  controllers: [AddressStreetController],
  providers: [AddressStreetService],
})
export class AddressStreetModule {}