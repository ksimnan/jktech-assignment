import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../domain/user/user.aggregate';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Add a new user
  @Post()
  async addUser(@Body() userDetail: User): Promise<User> {
    return this.userService.addUser(userDetail);
  }

  // Find user by ID
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  // Update user by ID
  @Patch(':id')
  async updateUserById(@Param('id') id: string, @Body() userDetail: User): Promise<boolean> {
    return this.userService.updateUserById(id, userDetail);
  }

  // Delete user by ID
  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<boolean> {
    return this.userService.deleteUserById(id);
  }
}
