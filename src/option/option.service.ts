import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from '../@datas/option.entity';
import { OptionDto, PatchOptionDto } from '../@dtos/option.dto';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async getAllOptions(): Promise<Option[]> {
    return await this.optionRepository.find();
  }

  async getOptionById(id: number): Promise<Option | undefined> {
    return await this.optionRepository.findOne({
      where: { id }
    });
  }

  async createOption(optionDto: OptionDto): Promise<Option> {
    const newOption = this.optionRepository.create(optionDto);
    return await this.optionRepository.save(newOption);
  }

  async updateOption(id: number, updateOptionDto: PatchOptionDto): Promise<Option | undefined> {
    const existingOption = await this.optionRepository.findOne({
      where: { id }
    });

    if (!existingOption) {
      throw new HttpException('Option not found', HttpStatus.NOT_FOUND);
    }

    this.optionRepository.merge(existingOption, updateOptionDto);

    return await this.optionRepository.save(existingOption);
  }

  async deleteOption(id: number): Promise<Option> {
    const result = this.getOptionById(id);
    await this.optionRepository.delete(id);
    return result;
  }
}
