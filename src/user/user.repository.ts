import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AlreadyExistsException } from 'src/commons/exceptions/already-exists.exception';
import { CreatedException } from 'src/commons/exceptions/created.exception';
import { NotFoundException } from 'src/commons/exceptions/not-found.exception';
import { BcryptService } from 'src/commons/services/bcrypt.service';
import { PrismaService } from 'src/commons/services/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  #bcryptService = new BcryptService();

  async create({
    cpf,
    email,
    password,
    role = 'USER',
  }: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AlreadyExistsException({ message: 'User already exists' });
    }

    const hashedPassword = await this.#bcryptService.hashPassword(password);

    const user = await this.prismaService.user.create({
      data: { cpf, email, password: hashedPassword, role },
    });

    throw new CreatedException({ object: user });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    if (!users) {
      throw new NotFoundException({ message: 'Users Not Found' });
    }

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    return user;
  }

  async update(
    id: string,
    { cpf, email, role, password }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    let userPassword: string = user.password;

    if (password) {
      userPassword = await this.#bcryptService.hashPassword(password);
    }

    return this.prismaService.user.update({
      where: { id },
      data: { cpf, email, role, password: userPassword },
    });
  }

  async remove(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
