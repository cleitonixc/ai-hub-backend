import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passwordHashed = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    return await this.userRepository.save({
      ...createUserDto,
      id: uuidv4(),
      password: passwordHashed,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      isActive: true,
      isDeleted: false,
      isBlocked: false,
      isAdmin: false,
      isSuperAdmin: false,
      lastAccess: new Date(),
      dealerId: uuidv4(),
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }
}
