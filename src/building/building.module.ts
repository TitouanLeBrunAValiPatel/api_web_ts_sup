import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Building } from 'src/@datas/building.entity';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Building])],
  providers: [BuildingService],
  controllers: [BuildingController],
  exports: [BuildingService]

})
export class BuildingModule {}