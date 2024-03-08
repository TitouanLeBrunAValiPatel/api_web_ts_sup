import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility } from '../@datas/facility.entity';
import { FacilityDto } from '../@dtos/facility.dto';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,
  ) {}

  async getAllFacilities(): Promise<Facility[]> {
    return await this.facilityRepository.find();
  }

  async getFacilityById(id: number): Promise<Facility | undefined> {
    return await this.facilityRepository.findOne({
      where: { id },
      relations: ['buildingRelations']

    });
  }

  async createFacility(facilityDto: FacilityDto): Promise<Facility> {
    const newFacility = this.facilityRepository.create(facilityDto);
    return await this.facilityRepository.save(newFacility);
  }

  async updateFacility(id: number, updateFacilityDto: Partial<FacilityDto>): Promise<Facility | undefined> {
    const existingFacility = await this.facilityRepository.findOne({
      where: { id }
    });

    if (!existingFacility) {
      throw new HttpException('Facility not found', HttpStatus.NOT_FOUND);
    }

    this.facilityRepository.merge(existingFacility, updateFacilityDto);

    return await this.facilityRepository.save(existingFacility);
  }

  async deleteFacility(id: number): Promise<Facility> {
    const result = await this.getFacilityById(id);
    await this.facilityRepository.delete(id);
    return result;
  }
}
