import { UserEntity, UserType } from "../../user/user.entity";

export class LoginPayloadDto {
  id: string;
  email: string;
  name: string;
  type: UserType;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.type = user.type;
  }
}