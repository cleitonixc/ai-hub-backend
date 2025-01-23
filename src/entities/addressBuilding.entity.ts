import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { AddressBuildingNodeEntity } from "./addressBuildingNode.entity";

enum BuildingTypeEnum {
  BUILDING = 'BUILDING',
  HOUSE = 'HOUSE',
  OTHER = 'OTHER'
}

@Entity({ name: 'address_buildings' })  
export class AddressBuildingEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number
  
  @Column({name: 'building_name', type: 'varchar', nullable: true, default: null})
  buildingName?: string

  @Column({name: 'building_number', type: 'varchar', nullable: true, default: null})
  buildingNumber?: string

  //TODO: add buildingType enum
  @Column({name: 'building_type', type: 'enum', enum: BuildingTypeEnum, nullable: true, default: null})
  buildingType?: BuildingTypeEnum

  //TODO: add buildingLevels
  @Column({name: 'building_levels', type: 'int', nullable: true, default: null})
  buildingLevels?: number

  //TODO: add buildingHeight
  @Column({name: 'building_height', type: 'int', nullable: true, default: null})
  buildingHeight?: number

  //TODO: add buildingNodes
  @ManyToOne(() => AddressBuildingNodeEntity)
  @JoinColumn({name: 'building_node_id', referencedColumnName: 'id'})
  buildingNode: AddressBuildingNodeEntity

  @Column({name: 'osm_id', type: 'int', nullable: true, default: null})
  osmId?: number

  @OneToMany(() => AddressEntity, (address) => address.building)
  addresses: AddressEntity[];
}
