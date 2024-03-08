import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Apartment } from 'src/@datas/apartment.entity';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { BuildingModule } from 'src/building/building.module';

@Module({
  imports: [BuildingModule, TypeOrmModule.forFeature([Apartment])],
  providers: [ApartmentService],
  controllers: [ApartmentController],
  exports: [ApartmentService]
})
export class ApartmentModule {}