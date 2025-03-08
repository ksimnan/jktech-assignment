import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { NotFoundException } from '@nestjs/common';
import { User } from '../../domain/user/user';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  const mockUserRepository = {
    addUser: jest.fn(),
    findUserById: jest.fn(),
    findByEmail: jest.fn(),
    updateUserById: jest.fn(),
    deleteUserById: jest.fn(),
  };

  const mockUser: User = {
    id: '1',
    email: 'john.doe@example.com',
    role: 'user',
    createdBy: 'created by',
    password: 'password',
    createdDateTime: new Date()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addUser', () => {
    it('should add a user successfully', async () => {
      mockUserRepository.addUser.mockResolvedValue(mockUser);

      const result = await userService.addUser(mockUser);
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.addUser).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findUserById', () => {
    it('should return a user if found', async () => {
      mockUserRepository.findUserById.mockResolvedValue(mockUser);

      const result = await userService.findUserById('1');
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserRepository.findUserById.mockResolvedValue(null);

      await expect(userService.findUserById('2')).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith('2');
    });
  });

  describe('findByEmail', () => {
    it('should return a user if found by email', async () => {
      mockUserRepository.findUserById.mockResolvedValue(mockUser);

      const result = await userService.findByEmail('john.doe@example.com');
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith('john.doe@example.com');
    });

    it('should throw NotFoundException if user is not found by email', async () => {
      mockUserRepository.findUserById.mockResolvedValue(null);

      await expect(userService.findByEmail('unknown@example.com')).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith('unknown@example.com');
    });
  });

  describe('updateUserById', () => {
    it('should update a user if it exists', async () => {
      mockUserRepository.findUserById.mockResolvedValue(mockUser);
      mockUserRepository.updateUserById.mockResolvedValue(true);

      const result = await userService.updateUserById('1', mockUser);
      expect(result).toBe(true);
      expect(mockUserRepository.updateUserById).toHaveBeenCalledWith('1', mockUser);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserRepository.findUserById.mockResolvedValue(null);

      await expect(userService.updateUserById('2', mockUser)).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith('2');
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user if it exists', async () => {
      mockUserRepository.findUserById.mockResolvedValue(mockUser);
      mockUserRepository.deleteUserById.mockResolvedValue(true);

      const result = await userService.deleteUserById('1');
      expect(result).toBe(true);
      expect(mockUserRepository.deleteUserById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserRepository.findUserById.mockResolvedValue(null);

      await expect(userService.deleteUserById('2')).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith('2');
    });
  });
});
