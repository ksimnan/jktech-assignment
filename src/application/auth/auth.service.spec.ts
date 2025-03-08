import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation((payload) => `mockedToken-${payload.userId}`),
            verify: jest.fn().mockImplementation((token) => {
              if (token === 'validToken') {
                return { userId: '123', role: 'user' };
              }
              throw new Error('Invalid token');
            }),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('hashPassword', () => {
    it('should hash the password correctly', async () => {
      const password = 'testPassword';
      const hashedPassword = await authService.hashPassword(password);

      expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
    });
  });

  describe('comparePasswords', () => {
    it('should return true for matching passwords', async () => {
      const password = 'testPassword';
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await authService.comparePasswords(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'testPassword';
      const hashedPassword = await bcrypt.hash('differentPassword', 10);

      const result = await authService.comparePasswords(password, hashedPassword);
      expect(result).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate a JWT token', async () => {
      const userId = '123';
      const role = 'admin';

      const token = await authService.generateToken(userId, role);
      expect(token).toBe(`mockedToken-${userId}`);
    });
  });

  describe('validateUser', () => {
    it('should return the payload if valid', () => {
      const payload = { userId: '123', role: 'user' };

      const result = authService.validateUser(payload);
      expect(result).toEqual(payload);
    });

    it('should throw UnauthorizedException if payload is invalid', () => {
      expect(() => authService.validateUser(null)).toThrow(UnauthorizedException);
    });
  });

  describe('validateToken', () => {
    it('should return decoded token if valid', async () => {
      const token = 'validToken';

      const result = await authService.validateToken(token);
      expect(result).toEqual({ userId: '123', role: 'user' });
    });

    it('should throw UnauthorizedException for invalid token', async () => {
      const token = 'invalidToken';

      await expect(authService.validateToken(token)).rejects.toThrow(UnauthorizedException);
    });
  });
});
