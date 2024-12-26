import { Controller, Post, Body, Get, UsePipes, ValidationPipe, Param, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get() async findAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (UserEntity) => new ReturnUserDto(UserEntity),
    );
  }

  @Get(':id')
  async getUserByIdUsingRelations(@Param('id') id: string): Promise<ReturnUserDto>{
    const user = await this.userService.getUserByIdUsingRelations(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userReturn = new ReturnUserDto(user);

    console.log(userReturn);

    return userReturn;
  }
}
