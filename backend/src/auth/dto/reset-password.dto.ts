import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'novaSenha123' })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({ example: 'token-gerado' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
