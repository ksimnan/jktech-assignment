// import { Injectable } from '@nestjs/common';
// import { Sequelize } from 'sequelize-typescript';
// import { UserEntity } from '../entity/user.entity';
// import { IUserRepository } from '../../domain/user/repository';
// import { User } from '../../domain/user/user';

// @Injectable()
// export class UserRepository implements IUserRepository {
//   constructor(
//     private readonly sequelize: Sequelize,
//   ) {}

//   // Add User methods
//   async addUser(userDetail: User): Promise<User> {
//     const entity = await this.sequelize.getRepository(UserEntity).create(userDetail);
//     return entity
//   }

//   async findUserById(id: string): Promise<User | null> {
//     const entity = await this.sequelize.getRepository(UserEntity).findOne({
//       where: { id },
//     });
//     if (!entity) return null;
//     return entity
//   }

//   async updateUserById(id: string, userDetail: User): Promise<boolean> {
//     await await this.sequelize.getRepository(UserEntity).update(userDetail, {
//       where: {id },
//     });
//     return true;
//   }

//   async deleteUserById(id: string): Promise<boolean> {
//     await this.sequelize.getRepository(UserEntity).destroy({
//         where: {
//             id,
//         },
//     });
//     return true;
// }
// }

import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserEntity } from '../entity/user.entity';
import { IUserRepository } from '../../domain/user/repository';
import { User } from '../../domain/user/user';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly userMapper: UserMapper, // Inject the mapper
  ) {}

  async addUser(userDetail: User): Promise<User> {
    const entity = await this.sequelize
      .getRepository(UserEntity)
      .create(this.userMapper.toPersistance(userDetail));
    return this.userMapper.toDomain(entity);
  }

  async findUserById(id: string): Promise<User | null> {
    const entity = await this.sequelize.getRepository(UserEntity).findOne({
      where: { id },
    });
    if (!entity) return null;
    return this.userMapper.toDomain(entity);
  }

  async findUserByEmailId(email: string): Promise<User | null> {
    const entity = await this.sequelize.getRepository(UserEntity).findOne({
      where: { email },
    });
    if (!entity) return null;
    return this.userMapper.toDomain(entity);
  }

    async updateUserById(id: string, userDetail: User): Promise<boolean> {
    await await this.sequelize.getRepository(UserEntity).update(this.userMapper.toPersistance(userDetail), {
      where: {id },
    });
    return true;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const deleted = await this.sequelize.getRepository(UserEntity).destroy({
      where: { id },
    });
    return deleted > 0;
  }
}
