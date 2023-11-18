import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/commons/services/prisma.service';
import { UserRepository } from './user.repository';
import { BcryptService } from 'src/commons/services/bcrypt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, BcryptService],
  exports: [UserService, UserRepository]
})
export class UserModule { }
