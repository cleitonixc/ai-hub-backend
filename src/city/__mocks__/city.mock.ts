import { stateEntityMock } from '../../state/__mocks__/state.mock';
import { CityEntity } from '../city.entity';

export const cityEntityMock: CityEntity = {
  id: 1,
  name: 'Anytown',
  state: stateEntityMock,
  stateId: 1,
  cityCode: '12345',
  latLon: {
    type: 'Point',
    coordinates: [0, 0]
  },
  tomCode: '12345',
  createdAt: new Date(),
  updatedAt: new Date(),
  addresses: []
};