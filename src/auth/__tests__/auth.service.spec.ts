import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { UserEntity } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let mockUserService: Partial<UserService>;
  let mockJwtService: Partial<JwtService>;

  beforeEach(async () => {
    process.env.JWT_REFRESH_TOKEN_SECRET = 'test-secret';
    process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME = '7d';

    mockUserService = {
      findUserByEmail: jest.fn()
    };
    mockJwtService = {
      sign: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123'
      };
      const mockUser = { 
        id: '1', 
        email: 'test@example.com', 
        password: 'hashedPassword',
        type: 'user'
      } as UserEntity;
      
      (mockUserService.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (mockJwtService.sign as jest.Mock)
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      // Act
      const result = await service.login(loginDto);

      // Assert
      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      
      // Verify access token payload
      const accessTokenPayload = (mockJwtService.sign as jest.Mock).mock.calls[0][0];
      expect(accessTokenPayload).toEqual(expect.objectContaining({
        type: 'user'
      }));

      // Verify refresh token payload and options
      const refreshTokenPayload = (mockJwtService.sign as jest.Mock).mock.calls[1][0];
      const refreshTokenOptions = (mockJwtService.sign as jest.Mock).mock.calls[1][1];
      expect(refreshTokenPayload).toEqual(expect.objectContaining({
        type: 'user'
      }));
      expect(refreshTokenOptions).toEqual({
        secret: 'test-secret',
        expiresIn: '7d'
      });

      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: mockUser
      });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };
      
      (mockUserService.findUserByEmail as jest.Mock).mockRejectedValue(new Error('User not found'));

      // Act & Assert
      await expect(service.login(loginDto))
        .rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password does not match', async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };
      const mockUser = { 
        id: '1', 
        email: 'test@example.com', 
        password: 'hashedPassword',
        type: 'user'
      } as UserEntity;
      
      (mockUserService.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act & Assert
      await expect(service.login(loginDto))
        .rejects.toThrow(UnauthorizedException);
    });

    it('should handle scenario with undefined user password', async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123'
      };
      const mockUser = { 
        id: '1', 
        email: 'test@example.com', 
        password: undefined,
        type: 'user'
      } as UserEntity;
      
      (mockUserService.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act & Assert
      await expect(service.login(loginDto))
        .rejects.toThrow(UnauthorizedException);
    });
  });
});
