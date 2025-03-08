import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from '../user/user.module';
import { AuthController } from '../../interface/auth.controller';
import { JwtAuthGuard } from './auth.guard';
import { RolesGuard } from './role.guard';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule, // Ensure the UserModule is imported for user-related services
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Apply JwtAuthGuard globally
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Apply RolesGuard globally
    },
  ],
  exports: [AuthService], // Export AuthService for use in other modules
})
export class AuthModule {}
