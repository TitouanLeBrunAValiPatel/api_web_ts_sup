import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Option } from 'src/@models/option.model';

export class OptionDto implements Option {
  @ApiProperty()
  id ?: number;
  @ApiProperty()
  name: string;

  // Vous pouvez ajouter d'autres champs du DTO au besoin.
}

export class PatchOptionDto extends PartialType(OptionDto) {}
