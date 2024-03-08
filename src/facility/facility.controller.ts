import { Controller, Get, Param, Post, Delete, Body, HttpException, HttpStatus, ParseIntPipe, Patch, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FacilityService } from './facility.service';
import { FacilityDto, PatchFacilityDto } from '../@dtos/facility.dto';

@ApiTags('facilities')
@Controller('facilities')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Get()
  async getAllFacilities() {
    return await this.facilityService.getAllFacilities();
  }

  @Get(':id')
  async getFacilityById(@Param('id', ParseIntPipe) id: number) {
    const facility = await this.facilityService.getFacilityById(id);
    if (!facility) {
      throw new HttpException('Facility not found', HttpStatus.NOT_FOUND);
    }
    return facility;
  }

  @Post()
  async createFacility(@Body() createFacilityDto: FacilityDto) {
    return await this.facilityService.createFacility(createFacilityDto);
  }

  @Delete(':id')
  async deleteFacility(@Res() res, @Param('id') id: number) {
    const result = await this.facilityService.deleteFacility(id);
    if (!result) {
      throw new HttpException('Facility not found', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({
      message: 'Facility has been deleted!',
      oldItem: result,
    });
  }

  @Patch(':id')
async updateFacility(@Param('id') id: number, @Body() updateFacilityDto: PatchFacilityDto) {
  const result = await this.facilityService.updateFacility(id, updateFacilityDto);
  if (!result) {
    throw new HttpException('Facility not found', HttpStatus.NOT_FOUND);
  }
  return result;
}

}
