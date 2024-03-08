import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, Double } from 'typeorm';
import { Apartment } from './apartment.entity';
import { BuildingFacility } from './building-facility.entity';
import { Facility } from './facility.entity';

@Entity()
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  constructionDate: Date;

  @OneToMany(() => Apartment, (apartment) => apartment.building, { cascade: true, onDelete: 'CASCADE' })
  apartments: Apartment[];

  @OneToMany(() => BuildingFacility, (relation) => relation.building, { cascade: true })
  buildingRelations: BuildingFacility[];

  totalApartments?: number;
  occupationRate? : number;
  totalTenantsCount? : number;
  totalApartmentsUnderRental? : number;
  totalApartmentsOverletting? : number;
  facilities : Facility[];



}
