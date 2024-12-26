import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity, UserType } from '../user.entity';
import { CreateUserDto } from '../dtos/createUser.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');
jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository: Partial<Repository<UserEntity>>;

  beforeEach(async () => {
    mockUserRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { 
          provide: 'UserEntityRepository', 
          useValue: mockUserRepository 
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should successfully create a new user', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
        type: UserType.ADMIN
      };
      const hashedPassword = 'hashedPassword';
      const mockUserId = 'mock-uuid';
      const mockDealerId = 'dealer-uuid';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (uuidv4 as jest.Mock).mockReturnValueOnce(mockUserId).mockReturnValueOnce(mockDealerId);
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);
      (mockUserRepository.save as jest.Mock).mockImplementation(user => user);

      // Act
      const result = await service.createUser(createUserDto);

      // Assert
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ 
        where: { email: createUserDto.email } 
      });
      expect(result).toEqual(expect.objectContaining({
        email: createUserDto.email,
        password: hashedPassword,
        id: mockUserId,
        dealerId: mockDealerId,
        isActive: true,
        isDeleted: false,
        isBlocked: false,
        isAdmin: false,
        isSuperAdmin: false
      }));
    });

    it('should throw ConflictException if user already exists', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'John Doe',
        type: UserType.ADMIN
      };
      const existingUser = { id: 'existing-user-id' } as UserEntity;

      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(existingUser);

      // Act & Assert
      await expect(service.createUser(createUserDto))
        .rejects.toThrow(ConflictException);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // Arrange
      const mockUsers = [
        { id: '1', email: 'user1@test.com' },
        { id: '2', email: 'user2@test.com' }
      ] as UserEntity[];
      (mockUserRepository.find as jest.Mock).mockResolvedValue(mockUsers);

      // Act
      const result = await service.getAllUsers();

      // Assert
      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('getUserByIdUsingRelations', () => {
    it('should return user with addresses', async () => {
      // Arrange
      const mockUser = { 
        id: 'user-id', 
        email: 'test@example.com',
        addresses: [] 
      } as UserEntity;
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(mockUser);

      // Act
      const result = await service.getUserByIdUsingRelations('user-id');

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'user-id' },
        relations: ['addresses']
      });
    });
  });

  describe('findUserById', () => {
    it('should return user with full relations', async () => {
      // Arrange
      const mockUser = { 
        id: 'user-id', 
        email: 'test@example.com',
        addresses: [{ 
          city: { 
            state: {} 
          } 
        }] 
      } as UserEntity;
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(mockUser);

      // Act
      const result = await service.findUserById('user-id');

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'user-id' },
        relations: {
          addresses: {
            city: {
              state: true
            }
          }
        }
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      // Arrange
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(service.findUserById('non-existent-id'))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('findUserByEmail', () => {
    it('should return user when email exists', async () => {
      // Arrange
      const mockUser = { 
        id: 'user-id', 
        email: 'test@example.com' 
      } as UserEntity;
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(mockUser);

      // Act
      const result = await service.findUserByEmail('test@example.com');

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      });
    });
  });
});
