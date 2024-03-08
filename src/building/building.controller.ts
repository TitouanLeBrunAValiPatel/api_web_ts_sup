import { Controller, Get, Param, Patch, Post, Delete, Body, HttpException, HttpStatus, ParseIntPipe, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BuildingService } from './building.service';
import { BuildingDto, PatchBuildingDto } from '../@dtos/building.dto';

@ApiTags('buildings')
@Controller('buildings')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get()
  async getAllBuildings() {
    return await this.buildingService.getAllBuildings();
  }

  @Get(':id')
  async getBuildingById(@Param('id', ParseIntPipe) id: number) {
    const building = await this.buildingService.getBuildingDTOById(id);
    if (!building) {
      throw new HttpException('Building not found', HttpStatus.NOT_FOUND);
    }
    return building;
  }

  @Post()
  async createBuilding(@Body() createBuildingDto: BuildingDto) {
    return await this.buildingService.createBuilding(createBuildingDto);
  }

  @Patch(':id')
  async updateBuilding(@Param('id') id: number, @Body() updateBuildingDto: PatchBuildingDto) {
    return await this.buildingService.updateBuilding(id, updateBuildingDto);
  }

  @Delete(':id')
  async deleteBuilding(@Res() res, @Param('id') id: number) {
    const result = await this.buildingService.deleteBuilding(id);
    if (!result) {
      throw new HttpException('Building not found', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({
      message: 'Building has been deleted!',
      oldItem: result,
    });
  }
}
