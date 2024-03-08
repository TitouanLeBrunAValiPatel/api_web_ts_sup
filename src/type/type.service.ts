import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from '../@datas/type.entity';
import { TypeDto, PatchTypeDto } from '../@dtos/type.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}

  async getAllTypes(): Promise<Type[]> {
    return await this.typeRepository.find();
  }

  async getTypeById(id: number): Promise<Type | undefined> {
    return await this.typeRepository.findOne({
      where: { id }
    });
  }

  async createType(typeDto: TypeDto): Promise<Type> {
    const newType = this.typeRepository.create(typeDto);
    return await this.typeRepository.save(newType);
  }

  async updateType(id: number, updateTypeDto: PatchTypeDto): Promise<Type | undefined> {
    const existingType = await this.typeRepository.findOne({
      where: { id }
    });

    if (!existingType) {
      throw new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }

    this.typeRepository.merge(existingType, updateTypeDto);

    return await this.typeRepository.save(existingType);
  }

  async deleteType(id: number): Promise<boolean> {
    const result = await this.typeRepository.delete(id);
    return result.affected > 0;
  }
}
