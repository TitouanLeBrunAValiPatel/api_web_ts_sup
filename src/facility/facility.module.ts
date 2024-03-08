import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Facility } from 'src/@datas/facility.entity';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Facility])],
  providers: [FacilityService],
  controllers: [FacilityController],
  exports: [FacilityService]

})
export class FacilityModule {}