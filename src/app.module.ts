import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './application/user/user.module';
import * as dotenv from 'dotenv';
import { DocumentModule } from './application/document/document.module';
import { AuthModule } from './application/auth/auth.module';
import { IngestionModule } from './application/ingestion/ingestion.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    UserModule,
    DocumentModule,
    IngestionModule
  ],
})
export class AppModule {}
