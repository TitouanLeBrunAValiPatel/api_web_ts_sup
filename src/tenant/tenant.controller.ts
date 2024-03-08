import { Controller, Get, Param, Patch, Post, Delete, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { TenantDto, PatchTenantDto } from '../@dtos/tenant.dto';

@ApiTags('tenants')
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  async getAllTenants() {
    return await this.tenantService.getAllTenants();
  }

  @Get(':id')
  async getTenantById(@Param('id') id: number) {
    const tenant = await this.tenantService.getTenantById(id);
    if (!tenant) {
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
    }
    return tenant;
  }

  @Post()
  async createTenant(@Body() createTenantDto: TenantDto) {
    return await this.tenantService.createTenant(createTenantDto);
  }

  @Patch(':id')
  async updateTenant(@Param('id') id: number, @Body() updateTenantDto: PatchTenantDto) {
    const tenant = await this.tenantService.updateTenant(id, updateTenantDto);
    if (!tenant) {
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
    }
    return tenant;
  }

  @Delete(':id')
  async deleteTenant(@Res() res,@Param('id') id: number) {
    const result = await this.tenantService.deleteTenant(id);
    if (!result) {
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({
      message: 'Tenant has been deleted!',
      oldItem: result,
    }); 
  }
}
