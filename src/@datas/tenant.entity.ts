import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Apartment } from './apartment.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Apartment, (apartment) => apartment.tenants)
  apartment: Apartment;

}
