import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TypeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  number_person: number;

}

export class PatchTypeDto extends PartialType(TypeDto) {}
