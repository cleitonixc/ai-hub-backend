import { UserEntity } from "../../user/user.entity";

export class ReturnLoginDto {
  accessToken: string;
  refreshToken: string;
  user: UserEntity;

  constructor(userEntity: UserEntity) {
    this.accessToken = 'accessToken';
    this.refreshToken = 'refreshToken';
    this.user = userEntity;
  }
} 