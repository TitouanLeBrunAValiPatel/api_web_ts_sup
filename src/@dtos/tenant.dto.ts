import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Apartment } from 'src/@datas/apartment.entity';
import { Tenant } from 'src/@models/tenant.model';

export class TenantDto implements Tenant {
  
  @ApiProperty()
  id?: number;

  apartment: Apartment;

  @ApiProperty()
  name: string;

}

export class PatchTenantDto extends PartialType(TenantDto) {}
