import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingFacility } from '../@datas/building-facility.entity';
import { BuildingFacilityService } from './building-facility.service';
import { BuildingFacilityController } from './building-facility.controller';
import { BuildingModule } from 'src/building/building.module';
import { ApartmentModule } from 'src/apartment/apartment.module';
import { FacilityModule } from 'src/facility/facility.module';

@Module({
  imports: [BuildingModule, ApartmentModule, FacilityModule, TypeOrmModule.forFeature([BuildingFacility])],
  providers: [BuildingFacilityService],
  controllers: [BuildingFacilityController],
})
export class BuildingFacilityModule {}
