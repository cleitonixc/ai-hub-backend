import { UserEntity, UserType } from '../user.entity';

export const userEntityMock: UserEntity = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password',
  type: UserType.ADMIN,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  tenant: null,
  isActive: false,
  isDeleted: false,
  isBlocked: false,
  isAdmin: false,
  isSuperAdmin: false,
  lastAccess: undefined
};