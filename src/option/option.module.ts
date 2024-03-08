import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Option } from 'src/@datas/option.entity';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  providers: [OptionService],
  controllers: [OptionController]
})
export class OptionModule {}