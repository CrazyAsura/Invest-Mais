import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.createAdminUser();
  }

  private async createAdminUser() {
    const adminEmail = 'admininvestmais@gmail.com';
    const adminExists = await this.findByEmail(adminEmail);

    if (!adminExists) {
      const hashedPassword = await argon2.hash('none@3355');
      const admin = this.usersRepository.create({
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrador',
        role: UserRole.ADMIN,
        type: 'PF',
      });
      await this.usersRepository.save(admin);
      console.log('Usuário admin criado com sucesso!');
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['address', 'phones', 'employer', 'loans'],
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['address', 'phones', 'employer', 'loans'],
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    await this.usersRepository.update(id, { password: passwordHash });
  }
}
