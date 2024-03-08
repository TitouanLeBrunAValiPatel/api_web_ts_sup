import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BuildingFacility } from 'src/@datas/building-facility.entity';
import { Facility } from 'src/@models/facility.model';

export class FacilityDto implements Facility {

  buildingRelations?: BuildingFacility[];

  @ApiProperty()
  name: string;

  @ApiProperty()
  isSafetyEquipment: boolean;

}

export class PatchFacilityDto extends PartialType(FacilityDto) {}
