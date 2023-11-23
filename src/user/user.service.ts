import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    try {
      return this.userRepository.create(createUserDto);
    } catch (error) {
      throw new Error('Error while creating user' + error.message);
    }
  }

  findAll() {
    try {
      return this.userRepository.findAll();
    } catch (error) {
      throw new Error('Error while fetching users' + error.message);
    }
  }

  findOne(id: string) {
    try {
      return this.userRepository.findOne(id);
    } catch (error) {
      throw new Error('Error while fetching user' + error.message);
    }
  }

  findByEmail(email: string) {
    try {
      return this.userRepository.findByEmail(email);
    } catch (error) {
      throw new Error('Error while fetching user' + error.message);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new Error('Error while updating user' + error.message);
    }
  }

  remove(id: string) {
    try {
      return this.userRepository.remove(id);
    } catch (error) {
      throw new Error('Error while deleting user' + error.message);
    }
  }
}
