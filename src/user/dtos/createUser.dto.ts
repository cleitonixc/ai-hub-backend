export interface CreateUserDto {
  name: string;
  email: string;
  phone: string;
  personDocument: string;
  password: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isActive: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  lastAccess: Date;
  dealerId: number;
}
