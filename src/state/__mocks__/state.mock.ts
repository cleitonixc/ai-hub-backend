import { StateEntity } from '../state.entity';

export const stateEntityMock: StateEntity = {
  id: 1,
  name: 'Anytown',
  stateCode: 'CA',
  countryId: 1,
  phonePrefixes: ['123'],
  abbreviation: 'CA',
  createdAt: new Date(),
  updatedAt: new Date(),
  cities: [],
  addresses: []
};