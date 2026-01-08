import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Nome do Usuário', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'PF', enum: ['PF', 'PJ'], required: false })
  @IsOptional()
  @IsEnum(['PF', 'PJ'])
  type?: 'PF' | 'PJ';

  @ApiProperty({ example: '123.456.789-00', required: false })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiProperty({ example: '01001-000', required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ example: 'Brasil', required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: 'SP', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: 'São Paulo', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: '100', required: false })
  @IsOptional()
  @IsString()
  addressNumber?: string;

  @ApiProperty({ example: '+55', required: false })
  @IsOptional()
  @IsString()
  phoneDdi?: string;

  @ApiProperty({ example: '11', required: false })
  @IsOptional()
  @IsString()
  phoneDdd?: string;

  @ApiProperty({ example: '99999-9999', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
