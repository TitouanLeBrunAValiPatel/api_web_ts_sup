import { Controller, Get, Param, Patch, Post, Delete, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OptionService } from './option.service';
import { OptionDto, PatchOptionDto } from '../@dtos/option.dto';

@ApiTags('options')
@Controller('options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Get()
  async getAllOptions() {
    return await this.optionService.getAllOptions();
  }

  @Get(':id')
  async getOptionById(@Param('id') id: number) {
    const option = await this.optionService.getOptionById(id);
    if (!option) {
      throw new HttpException('Option not found', HttpStatus.NOT_FOUND);
    }
    return option;
  }

  @Post()
  async createOption(@Body() createOptionDto: OptionDto) {
    return await this.optionService.createOption(createOptionDto);
  }

  @Patch(':id')
  async updateOption(@Param('id') id: number, @Body() updateOptionDto: PatchOptionDto) {
    const option = await this.optionService.updateOption(id, updateOptionDto);
    if (!option) {
      throw new HttpException('Option not found', HttpStatus.NOT_FOUND);
    }
    return option;
  }

  @Delete(':id')
  async deleteOption(@Res() res, @Param('id') id: number) {
    const result = await this.optionService.deleteOption(id);
    if (!result) {
      throw new HttpException('Option not found', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({
      message: 'Option has been deleted!',
      oldItem: result,
    });  
  }
}
