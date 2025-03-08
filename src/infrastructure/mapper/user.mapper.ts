import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user/user';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserMapper {
    toPersistance(user: User): UserEntity {
        return new UserEntity(user as any);
    }
  toDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      createdBy: entity.createdBy,
      createdDateTime: entity.createdDateTime,
      modifiedDateTime: entity.modifiedDateTime,
      modifiedBy: entity.modifiedBy,
    });
  }
}
