import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/user/user.aggregate';
import { UserRepository } from '../../infrastructure/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // Add a new user
  async addUser(userDetail: User): Promise<User> {
    return this.userRepository.addUser(userDetail);
  }

  // Find user by ID
  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Update user by ID
  async updateUserById(id: string, userDetail: User): Promise<boolean> {
    const existingUser = await this.findUserById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userRepository.updateUserById(id, userDetail);
  }

  // Delete user by ID
  async deleteUserById(id: string): Promise<boolean> {
    const existingUser = await this.findUserById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userRepository.deleteUserById(id);
  }
}
