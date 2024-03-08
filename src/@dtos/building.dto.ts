import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsDate, IsOptional, IsString } from 'class-validator';
import { Apartment } from 'src/@datas/apartment.entity';
import { BuildingFacility } from 'src/@datas/building-facility.entity';
import { Facility } from 'src/@datas/facility.entity';
import { Building } from 'src/@models/building.model';

export class BuildingDto implements Building{
  @ApiProperty()
  name: string;

  @ApiProperty()
  constructionDate: Date;


  apartments?: Apartment[];
  facilities?: Facility[]; 

  totalApartments?: number;
  occupationRate? : number;
  totalTenantsCount? : number;
  totalApartmentsUnderRental? : number;
  totalApartmentsOverletting? : number;

}

export class PatchBuildingDto extends PartialType(BuildingDto) {}
