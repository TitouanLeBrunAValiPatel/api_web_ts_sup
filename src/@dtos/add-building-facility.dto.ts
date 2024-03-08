import { ApiProperty } from '@nestjs/swagger';

export class AddBuildingFacilityDto {

    @ApiProperty()
    facilityId: number;
    @ApiProperty()
    buildingId: number;
    @ApiProperty()
    lastInspectionDate?: Date;


}

// export class PatchOptionDto extends PartialType(BuildingFacilityDto) {}
