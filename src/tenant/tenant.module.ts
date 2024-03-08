import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Tenant } from 'src/@datas/Tenant.entity';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [TenantService],
  controllers: [TenantController]
})
export class TenantModule {}