import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { IUserRepository } from '../../domain/user/repository';
import { User } from '../../domain/user/user.aggregate';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly sequelize: Sequelize,
  ) {}

  // Add User methods
  async addUser(userDetail: User): Promise<User> {
    const entity = await this.sequelize.getRepository(UserEntity).create(userDetail);
    return entity
  }

  async findUserById(id: string): Promise<User | null> {
    const entity = await this.sequelize.getRepository(UserEntity).findOne({
      where: { id },
    });
    if (!entity) return null;
    return entity
  }

  async updateUserById(id: string, userDetail: User): Promise<boolean> {
    await await this.sequelize.getRepository(UserEntity).update(userDetail, {
      where: {id },
    });
    return true;
  }

  async deleteUserById(id: string): Promise<boolean> {
    await this.sequelize.getRepository(UserEntity).destroy({
        where: {
            id,
        },
    });
    return true;
}
}
