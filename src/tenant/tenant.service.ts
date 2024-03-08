import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../@datas/tenant.entity';
import { TenantDto, PatchTenantDto } from '../@dtos/tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async getAllTenants(): Promise<Tenant[]> {
    return await this.tenantRepository.find();
  }

  async getTenantById(id: number): Promise<Tenant | undefined> {
    return await this.tenantRepository.findOne({
      where: { id },
      relations : ['apartment']
    });
  }

  async createTenant(tenantDto: TenantDto): Promise<Tenant> {
    const newTenant = this.tenantRepository.create(tenantDto);
    return await this.tenantRepository.save(newTenant);
  }

  async updateTenant(id: number, updateTenantDto: PatchTenantDto): Promise<Tenant | undefined> {
    const existingTenant = await this.tenantRepository.findOne({
      where: { id }
    });

    if (!existingTenant) {
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
    }

    this.tenantRepository.merge(existingTenant, updateTenantDto);

    return await this.tenantRepository.save(existingTenant);
  }

  async deleteTenant(id: number): Promise<Tenant> {
    const result = this.getTenantById(id);
    await this.tenantRepository.delete(id);
    return result;
  }
}
