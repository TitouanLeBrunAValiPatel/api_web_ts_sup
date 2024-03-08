import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Type } from 'src/@datas/Type.entity';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  providers: [TypeService],
  controllers: [TypeController]
})
export class TypeModule {}