import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Building } from './building.entity';
import { Option } from './option.entity';
import { Tenant } from './tenant.entity';
import { Type } from './type.entity';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Type, (type) => type.apartments)
  type: Type;

  @Column()
  name: string;

  @ManyToOne(() => Building, (building) => building.apartments)
  building: Building;

  @ManyToMany(() => Option)
  @JoinTable()
  options: Option[];

  @OneToMany(() => Tenant, (tenant) => tenant.apartment)
  tenants: Tenant[];

  
  @OneToOne(() => Tenant, { nullable: true }) // Vous pouvez ajuster nullable en fonction de vos besoins
  @JoinColumn()
  mainTenant: Tenant;
}
