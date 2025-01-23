import { BaseEntity, Column, Entity, OneToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { AddressBuildingEntity } from "./addressBuilding.entity";

@Entity({ name: 'address_building_nodes' })
export class AddressBuildingNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => AddressBuildingEntity, (addressBuilding) => addressBuilding.buildingNode)
  addressBuildings: AddressBuildingEntity[];

  @Column({name: 'osm_id', type: 'int', nullable: true, default: null})
  osmId?: number

  //TODO: add latitude and longitude postgres type point
  @Column({name: 'location', type: 'point', nullable: true, default: null})
  location?: Point
}