import { Controller, Post, Get, Patch, Delete, Param, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../application/user/user.service';
import { User } from '../domain/user/user';

@ApiTags('users') // Group for Swagger
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
  async addUser(@Body() userDetail: User): Promise<User> {
    return this.userService.addUser(userDetail);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by ID' })
  @ApiResponse({ status: 200, description: 'The user data', type: User })
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: Boolean })
  async updateUserById(@Param('id') id: string, @Body() userDetail: User): Promise<boolean> {
    return this.userService.updateUserById(id, userDetail);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.', type: Boolean })
  async deleteUserById(@Param('id') id: string): Promise<boolean> {
    return this.userService.deleteUserById(id);
  }
}
