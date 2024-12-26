import { cityEntityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../address.entity';
import { stateEntityMock } from '../../state/__mocks__/state.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { DealerEntity } from '../../dealer/dealer.entity';

export const addressEntityMock: AddressEntity = {
  id: 1,
  street: '123 Main St',
  city: cityEntityMock,
  state: stateEntityMock,
  zipCode: '12345',
  number: '123',
  complement: 'Apto 101',
  user: userEntityMock,
  createdAt: new Date(),
  updatedAt: new Date(),
  map: function (arg0: (address: any) => import("../dtos/returnAddress.dto").ReturnAddressDto): import("../dtos/returnAddress.dto").ReturnAddressDto[] {
    throw new Error('Function not implemented.');
  },
  dealer: new DealerEntity()
};