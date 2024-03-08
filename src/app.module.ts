import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './@datas/apartment.entity';
import { BuildingFacility } from './@datas/building-facility.entity';
import { Building } from './@datas/building.entity';
import { Facility } from './@datas/facility.entity';
import { Tenant } from './@datas/tenant.entity';
import { Option } from './@datas/option.entity';
import { Type } from './@datas/type.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BuildingModule } from './building/building.module';
import { ApartmentModule } from './apartment/apartment.module';
import { FacilityModule } from './facility/facility.module';
import { OptionModule } from './option/option.module';
import { TenantModule } from './tenant/tenant.module';
import { TypeModule } from './type/type.module';
import { BuildingFacilityModule } from './building-facility/building.facility.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'titi',
      password: 'titi',
      database: 'eval',
      synchronize: false, /* Permet de mettre à jour la base de données tout seul. Laisser a false si vous ne voulez pas ce comportement */
      autoLoadEntities: true,
      logging: true, /* permet de voir la requete dans le terminal */
      entities: [
        Building,
        Apartment, 
        Option,
        Tenant,
        Type,
        BuildingFacility,
        Facility
      ]
    }),
    BuildingModule,
    ApartmentModule,
    FacilityModule,
    OptionModule,
    TenantModule,
    TypeModule,
    BuildingFacilityModule
    // PersonsModule,
    // MonitorsModule,
    // TypeOrmModule.forFeature([AddressEntity, PersonEntity, MonitorEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}