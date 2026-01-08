import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { Phone } from './entities/phone.entity';
import { Employer } from './entities/employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Phone, Employer])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
