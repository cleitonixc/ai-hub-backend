import { CreateUserDto } from '../../user/dtos/createUser.dto';

export interface CreateDealerDto {
  name: string;
  enterpriseDocument: string;
  email: string;
  phone: string;
  isActive: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  user: CreateUserDto;
}
