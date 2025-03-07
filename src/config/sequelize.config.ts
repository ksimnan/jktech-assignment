import { Sequelize } from 'sequelize-typescript';
import { UserEntity } from '../infrastructure/entity/user.entity';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nestjs_sequelize',
  models: [UserEntity], // Manually register models
  logging: false,
  synchronize: true,
});
