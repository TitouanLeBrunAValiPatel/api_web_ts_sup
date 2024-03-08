import { Injectable, HttpException, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApartmentService } from 'src/apartment/apartment.service';
import { BuildingService } from 'src/building/building.service';
import { FacilityService } from 'src/facility/facility.service';
import { Repository } from 'typeorm';
import { BuildingFacility } from '../@datas/building-facility.entity';
import { AddBuildingFacilityDto } from '../@dtos/add-building-facility.dto';

@Injectable()
export class BuildingFacilityService {
  constructor(
    @InjectRepository(BuildingFacility)
    private buildingFacilityRepository: Repository<BuildingFacility>,
    private buildingService : BuildingService,
    private facilityService : FacilityService
  ) {}

  async getAllBuildingFacilities(): Promise<BuildingFacility[]> {
    return await this.buildingFacilityRepository.find();
  }

  async getBuildingFacilityById(id: number): Promise<BuildingFacility> {
    const buildingFacility = await this.buildingFacilityRepository.findOne({
        where: { id }
    });
    if (!buildingFacility) {
      throw new HttpException('Building Facility not found', HttpStatus.NOT_FOUND);
    }
    return buildingFacility;
  }

  async createBuildingFacility(buildingFacilityDto: AddBuildingFacilityDto): Promise<any> {

    const existingBuildingFacility = await this.buildingFacilityRepository.findOne({
        where: {
          building: { id: buildingFacilityDto.buildingId },
          facility: { id: buildingFacilityDto.facilityId },
        },
    });
    
    if (existingBuildingFacility) {
        throw new ConflictException('BuildingFacility relation already exists');
    }

    const building = await this.buildingService.getBuildingById(buildingFacilityDto.buildingId);
    const facility = await this.facilityService.getFacilityById(buildingFacilityDto.facilityId);
  
    if (!building || !facility) {
      throw new NotFoundException('Building or Facility not found');
    }
    var lastInspectionDate : Date;
    if(!buildingFacilityDto.lastInspectionDate){
        lastInspectionDate = building.constructionDate;
    } else {
        lastInspectionDate = buildingFacilityDto.lastInspectionDate;
    }
  
    const newBuildingFacility = this.buildingFacilityRepository.create({
      building: building,
      facility: facility,
      lastInspectionDate: buildingFacilityDto.lastInspectionDate,
    });
    await this.buildingFacilityRepository.save(newBuildingFacility)
  
    return buildingFacilityDto;
  }
  

  async updateBuildingFacility(id: number, updateBuildingFacilityDto: AddBuildingFacilityDto): Promise<BuildingFacility> {
    const existingBuildingFacility = await this.buildingFacilityRepository.findOne({
        where: { id }
    });
    if (!existingBuildingFacility) {
      throw new HttpException('Building Facility not found', HttpStatus.NOT_FOUND);
    }

    this.buildingFacilityRepository.merge(existingBuildingFacility, updateBuildingFacilityDto);
    return await this.buildingFacilityRepository.save(existingBuildingFacility);
  }

  async deleteBuildingFacility(id: number): Promise<BuildingFacility> {
    const buildingFacility = await this.buildingFacilityRepository.findOne({
        where: { id }
    });
    if (!buildingFacility) {
      throw new HttpException('Building Facility not found', HttpStatus.NOT_FOUND);
    }

    await this.buildingFacilityRepository.remove(buildingFacility);
    return buildingFacility;
  }
}
