import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity, UserType } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  getUserById(id: string) {
    throw new Error('Method not implemented.');
  }
  findByOne(arg0: { where: { email: string; }; }) {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
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

    const user = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (user) {
      throw new ConflictException('User already exists');
    }

    return this.userRepository.save({
      ...createUserDto,
      password: passwordHashed, 
      type: createUserDto.type ? createUserDto.type : UserType.SUPER_ADMIN,
      tenant: createUserDto.tenantId ? { id: createUserDto.tenantId } : undefined,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ 
      where: { id: id },
      relations: ['tenant']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ 
      where: { email },
      relations: ['userTenants', 'userTenants.tenant']
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findUserById(id);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async updateUserNickname(id: number, nickname: string): Promise<UserEntity> {
    const user = await this.findUserById(id);
    user.nickname = nickname;
    console.log(user);
    return this.userRepository.save(user);
  }

  async updateUserPassword(id: number, oldPassword: string, newPassword: string): Promise<UserEntity> {
    const user = await this.findUserById(id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Old password is incorrect');
    }
    const saltOrRounds = 10;
    const passwordHashed = await bcrypt.hash(newPassword, saltOrRounds);
    user.password = passwordHashed;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
