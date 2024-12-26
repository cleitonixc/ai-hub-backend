import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'country_name', nullable: false })
  countryName: string;

  //abreviacao do pais
  @Column({ name: 'country_abbreviation', nullable: false })
  countryAbbreviation: string;

  @Column({ name: 'country_code', nullable: false })
  countryCode: string;

  @Column({ name: 'country_code_phone', nullable: false })
  countryCodePhone: string;
}
