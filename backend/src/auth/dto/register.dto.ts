import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Nome do Usuário' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'PF', enum: ['PF', 'PJ'] })
  @IsEnum(['PF', 'PJ'])
  type: 'PF' | 'PJ';

  @ApiProperty({ example: '123.456.789-00' })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({ example: '01001-000' })
  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @ApiProperty({ example: 'Brasil' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: 'SP' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  @IsString()
  addressNumber: string;

  @ApiProperty({ example: '+55' })
  @IsNotEmpty()
  @IsString()
  phoneDdi: string;

  @ApiProperty({ example: '11' })
  @IsNotEmpty()
  @IsString()
  phoneDdd: string;

  @ApiProperty({ example: '99999-9999' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
