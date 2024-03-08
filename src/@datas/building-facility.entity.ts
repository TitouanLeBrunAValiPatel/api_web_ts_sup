import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Building } from './building.entity';
import { Facility } from './facility.entity';

@Entity()
export class BuildingFacility {
  @PrimaryGeneratedColumn()
  id: number;



  @ManyToOne(() => Building, (building) => building.buildingRelations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buildingId' })
  building: Building;

  @ManyToOne(() => Facility, (facility) => facility.buildingRelations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'facilityId' })
  facility: Facility;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastInspectionDate: Date;

  // D'autres propriétés spécifiques à la relation peuvent être ajoutées au besoin.
}
