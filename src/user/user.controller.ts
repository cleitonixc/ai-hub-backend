import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
  @Post() async createUser(@Body() createUserDto: CreateUserDto) {
    return {
      ...createUserDto,
      password: undefined,
    };
  }
}
