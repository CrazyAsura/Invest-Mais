import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário e obter token' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unauthorized';
      throw new UnauthorizedException(message);
    }
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicitar recuperação de senha' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Redefinir senha usando token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      const payload = this.jwtService.verify(resetPasswordDto.token);
      if (payload.type !== 'reset') {
        throw new Error('Token inválido para redefinição de senha');
      }
      return this.authService.resetPassword(
        payload.sub,
        resetPasswordDto.newPassword,
      );
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
