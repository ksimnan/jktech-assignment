
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { UserController } from '../../interface/user.controller';
import { UserMapper } from '../../infrastructure/mapper/user.mapper';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository,UserMapper],
  exports: [UserService],
})
export class UserModule {}
