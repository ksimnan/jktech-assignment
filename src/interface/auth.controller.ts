import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Req,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthService } from '../application/auth/auth.service';
  import { UserService } from '../application/user/user.service';
  import { JwtAuthGuard } from '../application/auth/auth.guard';
  import { RolesGuard } from '../application/auth/role.guard';
  import { Roles } from '../application/auth/role.decorator';
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly userService: UserService,
    ) {}
  
    @Post('register')
    async register(
      @Body() body: { id: string; email: string; password: string; role: string; createdBy: string },
    ) {
      const { id, email, password, role, createdBy } = body;
  
      // Check if the email is already in use
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        throw new UnauthorizedException('Email is already registered');
      }
  
      // Hash the password before saving the user
      const hashedPassword = await this.authService.hashPassword(password);
  
      // Create the user
      return this.userService.addUser({
        id,
        email,
        password: hashedPassword,
        role,
        createdBy,
        createdDateTime: new Date(),
      });
    }
  
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
      const { email, password } = body;
  
      // Find the user by email
      const user = await this.userService.findByEmail(email);
      if (!user || !(await this.authService.comparePasswords(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      // Generate JWT token
      const token = await this.authService.generateToken(user.id, user.role);
  
      return { token };
    }
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin') // Restrict access to admin users
    @Get('admin')
    async getAdminData(@Req() req: any) {
      const user = await this.userService.findUserById(req.user.id);
      return {
        message: 'Welcome Admin!',
        user,
      };
    }
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user', 'admin') // Restrict access to both admin and user roles
    @Get('profile')
    async getUserProfile(@Req() req: any) {
      const user = await this.userService.findUserById(req.user.id);
      return {
        message: 'User profile data',
        user,
      };
    }
  }
  