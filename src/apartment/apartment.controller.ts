import { ApiTags } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';
import { Controller, Get, Param, Patch, Post, Delete, Body, HttpException, HttpStatus, ParseIntPipe, Res } from '@nestjs/common';
import { ApartmentDto, PatchApartmentDto } from 'src/@dtos/apartment.dto';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get()
  async getAllApartments() {
    return await this.apartmentService.getAllApartments();
  }

  @Get(':id')
  async getApartmentById(@Param('id', ParseIntPipe) id: number) {
    const apartment = await this.apartmentService.getApartmentById(id);
    if (!apartment) {
      throw new HttpException('Apartment not found', HttpStatus.NOT_FOUND);
    }
    return apartment;
  }

  @Post()
  async createApartment(@Body() createApartmentDto: ApartmentDto) {
    return await this.apartmentService.createApartment(createApartmentDto);
  }

  @Patch(':id')
  async updateApartment(@Param('id') id: number, @Body() updateApartmentDto: PatchApartmentDto) {
    return await this.apartmentService.updateApartment(id, updateApartmentDto);
  }

  @Delete(':id')
  async deleteApartment(@Res() res, @Param('id') id: number) {
    const result = await this.apartmentService.deleteApartment(id);
    if (!result) {
      throw new HttpException('Apartment not found', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({
      message: 'Apartment has been deleted!',
      oldItem: result,
    });
  }
}
