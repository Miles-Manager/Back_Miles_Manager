import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createuserDto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: createuserDto,
    });

    return user;
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('user not found!');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('user not found!');
    }

    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('user not found!');
    }

    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
 