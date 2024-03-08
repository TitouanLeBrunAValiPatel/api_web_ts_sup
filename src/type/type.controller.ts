import { Controller, Get, Param, Patch, Post, Delete, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeService } from './type.service';
import { TypeDto, PatchTypeDto } from '../@dtos/type.dto';

@ApiTags('types')
@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  async getAllTypes() {
    return await this.typeService.getAllTypes();
  }

  @Get(':id')
  async getTypeById(@Param('id') id: number) {
    const type = await this.typeService.getTypeById(id);
    if (!type) {
      throw new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }
    return type;
  }

  @Post()
  async createType(@Body() createTypeDto: TypeDto) {
    return await this.typeService.createType(createTypeDto);
  }

  @Patch(':id')
  async updateType(@Param('id') id: number, @Body() updateTypeDto: PatchTypeDto) {
    const type = await this.typeService.updateType(id, updateTypeDto);
    if (!type) {
      throw new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }
    return type;
  }

  @Delete(':id')
  async deleteType(@Param('id') id: number) {
    const result = await this.typeService.deleteType(id);
    if (!result) {
      throw new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
