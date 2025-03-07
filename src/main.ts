import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { sequelize } from './src/config/sequelize.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Sync the database
  await sequelize.sync();

  await app.listen(3000);
}
bootstrap();
