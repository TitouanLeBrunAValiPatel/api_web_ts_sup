// type.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Apartment } from './apartment.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: 1})
  number_person: number;

  @OneToMany(() => Apartment, (apartment) => apartment.type)
  apartments: Apartment[];
}
