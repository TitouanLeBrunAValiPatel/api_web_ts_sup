import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingException, BuildingExceptionType } from 'src/@exceptions/building.exception';
import { Repository } from 'typeorm';
import { Building } from '../@datas/building.entity';
import { BuildingDto, PatchBuildingDto } from '../@dtos/building.dto';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
  ) {}

  async getAllBuildings(): Promise<Building[]> {
    return await this.buildingRepository.find();
  }

  async getBuildingDTOById(id: number): Promise<BuildingDto | undefined> {
    const result = await this.buildingRepository.findOne({
        where: { id },
        relations: ['apartments', 'buildingRelations.facility'],
      });
      const resultT = await this.buildingRepository.findOne({
        where: { id },
        relations: ['apartments', 'apartments.tenants', 'apartments.type'],
      });

      const totalApartments : number = result.apartments.length
      const occupiedApartment : number = resultT.apartments.filter((apart) => apart.tenants.length > 0).length;
      const totalTenantsCount = resultT.apartments.reduce((sum, apart) => sum + apart.tenants.length, 0);
      const totalApartmentsUnderRental: number = resultT.apartments.reduce(
        (sum, apart) => sum + (apart.tenants.length < apart.type.number_person ? 1 : 0),
        0
      );
      const totalApartmentsOverletting: number = resultT.apartments.reduce(
        (sum, apart) => sum + (apart.tenants.length > apart.type.number_person ? 1 : 0),
        0
      );
      result.occupationRate = occupiedApartment * 100 / totalApartments;
      result.totalTenantsCount = totalTenantsCount;
      result.totalApartmentsUnderRental = totalApartmentsUnderRental;
      result.totalApartmentsOverletting = totalApartmentsOverletting;
      result.totalApartments = totalApartments;

      return result;
  }
  async getBuildingById(id: number): Promise<Building | undefined> {
    const result = await this.buildingRepository.findOne({
        where: { id },
        relations: ['apartments'],
      });
      return result;
  }

  async createBuilding(createBuildingDto: BuildingDto): Promise<Building> {
    const newBuilding = this.buildingRepository.create(createBuildingDto);
    return await this.buildingRepository.save(newBuilding);
  }
  async updateBuilding(id: number, updateBuildingDto: PatchBuildingDto): Promise<Building | undefined> {
    const existingBuilding = await this.buildingRepository.findOne({
        where: { id },
        relations: ['apartments'],
      });

    if (!existingBuilding) {
      throw new HttpException('Building not found', HttpStatus.NOT_FOUND);
    }

    this.buildingRepository.merge(existingBuilding, updateBuildingDto);

    return await this.buildingRepository.save(existingBuilding);
  }

  async deleteBuilding(id: number): Promise<Building> {
    const result = this.getBuildingById(id);
    try {
      await this.buildingRepository.delete(id);
      return result;

    } catch (error) {
      if((await result).apartments.length > 0){
        throw new BuildingException(BuildingExceptionType.ApartmentConstraint);
      } else {
        throw new HttpException('My bad', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
    }

  }

}
