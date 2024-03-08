import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'src/@datas/building.entity';
import { BuildingService } from 'src/building/building.service';
import { DeepPartial, Repository } from 'typeorm';
import { Apartment } from '../@datas/apartment.entity';
import { ApartmentDto, PatchApartmentDto } from '../@dtos/apartment.dto';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
    private buildingService: BuildingService,
  ) {}

  async getAllApartments(): Promise<Apartment[]> {
    return await this.apartmentRepository.find();
  }

  async getApartmentById(id: number): Promise<any> {
    const apartment = await this.apartmentRepository.findOne({
      where: { id },
      relations: ['tenants', 'type'],
    });
  
    if (!apartment) {
      throw new HttpException('Apartment not found', HttpStatus.NOT_FOUND);
    }
  
    return apartment;
  }
  

  async createApartment(apartmentDto: ApartmentDto): Promise<Apartment> {
    const building = await this.buildingService.getBuildingById(apartmentDto.buildingid);

    if (!building) {
      throw new NotFoundException(`Building with ID ${apartmentDto.buildingid} not found`);
    }
    const apartment = this.apartmentRepository.create(apartmentDto);
    apartment.building = building;

    return await this.apartmentRepository.save(apartment);
  }

  async updateApartment(id: number, apartmentDto: PatchApartmentDto): Promise<Apartment | undefined> {
    const existingApartment = await this.apartmentRepository.findOne({
        where: { id },
        relations: ['tenants',],
    });

    if (!existingApartment) {
      throw new HttpException('Apartment not found', HttpStatus.NOT_FOUND);
    }

    this.apartmentRepository.merge(existingApartment, apartmentDto);

    return await this.apartmentRepository.save(existingApartment);
  }

  async deleteApartment(id: number): Promise<Apartment> {
    const result = this.getApartmentById(id);
    await this.apartmentRepository.delete(id);
    return result;
  }

}
