import { Controller, Post, Body, Get, UsePipes, ValidationPipe, Param, NotFoundException, Put, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UnauthorizedSchema, ErrorSchema } from '../../swagger/swagger.schemas';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from '../../decorators/user.decorator';
import { UserEntity } from '../../entities/user.entity';
import { UpdateNicknameDto } from './dtos/updateNickname.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@ApiSecurity('access-token')

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create new user',
    description: 'Creates a new user in the system'
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: ReturnUserDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided'
  })
  @ApiResponse({
    status: 409,
    description: 'Email already registered'
  })
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.createUser(createUserDto);
    return new ReturnUserDto(user);
  }

  @ApiOperation({
    summary: 'List all users',
    description: 'Returns a list of all registered users'
  })
  @ApiResponse({
    status: 200,
    description: 'User list returned successfully',
    type: [ReturnUserDto]
  })
  @ApiResponse({
    status: 403,
    description: 'No permission to list users'
  })
  @Get()
  async findAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (UserEntity) => new ReturnUserDto(UserEntity),
    );
  }

  @ApiOperation({
    summary: 'Find user by ID',
    description: 'Returns the data of a specific user'
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
    type: ReturnUserDto
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  @ApiResponse({
    status: 403,
    description: 'No permission to view user'
  })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<ReturnUserDto> {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new ReturnUserDto(user);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Updates the data of a specific user'
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: ReturnUserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'No permission to update user',
    schema: UnauthorizedSchema,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: ErrorSchema,
  })
  @ApiBearerAuth('access-token')
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.updateUser(id, updateUserDto)
    );
  }

  @ApiOperation({
    summary: 'Update user nickname',
    description: 'Updates the nickname of a specific user'
  })
  @ApiResponse({
    status: 200,
    description: 'Nickname updated successfully',
    type: ReturnUserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'No permission to update nickname',
    schema: UnauthorizedSchema,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Put(':id/nickname')
  async updateUserNickname(
    @Param('id') id: number,
    @Body() updateNicknameDto: UpdateNicknameDto,
    @UserDecorator() userAuth: UserEntity,
  ): Promise<ReturnUserDto> {
    console.log('ID da URL:', id, 'Tipo:', typeof id);
    console.log('User Auth:', userAuth);
    console.log('User Auth ID:', userAuth.id, 'Tipo:', typeof userAuth.id);
    
    if (Number(userAuth.id) !== Number(id)) {
      throw new UnauthorizedException('You do not have permission to change another user\'s nickname');
    }
    return new ReturnUserDto(await this.userService.updateUserNickname(id, updateNicknameDto.nickname));
  }

  @ApiOperation({
    summary: 'Update user password',
    description: 'Updates the password of a specific user'
  })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully',
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Password updated successfully'
        },
        user: {
          $ref: '#/components/schemas/ReturnUserDto'
        }
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'No permission to update password',
    schema: UnauthorizedSchema,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: ErrorSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Current password incorrect',
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Current password incorrect'
        },
        error: {
          type: 'string',
          example: 'Unauthorized'
        },
        statusCode: {
          type: 'number',
          example: 401
        }
      }
    }
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Put(':id/password')
  async updateUserPassword(
    @Param('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @UserDecorator() userAuth: UserEntity,
  ): Promise<{ message: string; user: ReturnUserDto }> {
    if (Number(userAuth.id) !== Number(id)) {
      throw new UnauthorizedException('You do not have permission to change another user\'s password');
    }
    const updatedUser = await this.userService.updateUserPassword(
      id, 
      updatePasswordDto.oldPassword, 
      updatePasswordDto.newPassword
    );
    return {
      message: 'Password updated successfully',
      user: new ReturnUserDto(updatedUser)
    };
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Removes a user from the system'
  })
  @ApiResponse({
    status: 204,
    description: 'User removed successfully'
  })
  @ApiResponse({
    status: 403,
    description: 'No permission to remove user'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
