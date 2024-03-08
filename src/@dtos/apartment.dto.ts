import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Building } from 'src/@datas/building.entity';
import { Tenant } from 'src/@datas/tenant.entity';
import { Type } from 'src/@datas/type.entity';
import { Apartment } from 'src/@models/apartment.model';

export class ApartmentDto implements Apartment {
  
  @ApiProperty()
  name: string;

  id?: number;

  @ApiProperty()
  mainTenantId: number;


  @ApiProperty()
  buildingid?: number;



}

export class PatchApartmentDto extends PartialType(ApartmentDto) {}