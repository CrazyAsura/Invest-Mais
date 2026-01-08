import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await argon2.hash(registerDto.password);
    const user = this.usersRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    const { password: _, ...result } = savedUser;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user || !(await argon2.verify(user.password, loginDto.password))) {
      throw new Error('Credenciais inválidas');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      // Por segurança, não informamos se o e-mail existe ou não
      return {
        message:
          'Se o e-mail existir em nossa base, um link de recuperação será enviado.',
      };
    }

    // Gerar um token temporário de 15 minutos para reset
    const token = this.jwtService.sign(
      { sub: user.id, type: 'reset' },
      { expiresIn: '15m' },
    );

    // Aqui você enviaria o e-mail. Vamos apenas retornar o token para fins de teste/demo
    console.log(`Reset Token para ${email}: ${token}`);

    return {
      message: 'Instruções de recuperação enviadas para o e-mail informado.',
      resetToken: token, // Retornamos apenas para facilitar a implementação do front sem serviço de e-mail
    };
  }

  async resetPassword(userId: string, newPassword: string) {
    const hashedPassword = await argon2.hash(newPassword);
    await this.usersRepository.update(userId, { password: hashedPassword });
    return { message: 'Senha atualizada com sucesso.' };
  }
}
