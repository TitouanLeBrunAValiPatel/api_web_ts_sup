import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    Res,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { BuildingFacilityService } from './building-facility.service';
  import { AddBuildingFacilityDto } from '../@dtos/add-building-facility.dto';
import { ApiTags } from '@nestjs/swagger';

  @ApiTags('buildingFacilities')
  @Controller('buildingFacilities')
  export class BuildingFacilityController {
    constructor(private readonly buildingFacilityService: BuildingFacilityService) {}
  
    @Get()
    async getAllBuildingFacilities() {
      return await this.buildingFacilityService.getAllBuildingFacilities();
    }
  
    @Get(':id')
    async getBuildingFacilityById(@Param('id') id: number) {
      const buildingFacility = await this.buildingFacilityService.getBuildingFacilityById(id);
      if (!buildingFacility) {
        throw new HttpException('Building Facility not found', HttpStatus.NOT_FOUND);
      }
      return buildingFacility;
    }
  
    @Post()
    async createBuildingFacility(@Body() buildingFacilityDto: AddBuildingFacilityDto) {
      return await this.buildingFacilityService.createBuildingFacility(buildingFacilityDto);
    }
  
    @Patch(':id')
    async updateBuildingFacility(@Param('id') id: number, @Body() updateBuildingFacilityDto: AddBuildingFacilityDto) {
      return await this.buildingFacilityService.updateBuildingFacility(id, updateBuildingFacilityDto);
    }
  
    @Delete(':id')
    async deleteBuildingFacility(@Res() res, @Param('id') id: number) {
      const result = await this.buildingFacilityService.deleteBuildingFacility(id);
      if (!result) {
        throw new HttpException('Building Facility not found', HttpStatus.NOT_FOUND);
      }
      return res.status(HttpStatus.OK).json({
        message: 'Building Facility has been deleted!',
        oldItem: result,
      });
    }
  }
  