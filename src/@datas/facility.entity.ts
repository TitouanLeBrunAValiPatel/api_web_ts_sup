import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { BuildingFacility } from './building-facility.entity';

@Entity()
export class Facility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isSafetyEquipment: boolean;

  @OneToMany(() => BuildingFacility, (relation) => relation.facility, { cascade: true })
  buildingRelations: BuildingFacility[];

}
