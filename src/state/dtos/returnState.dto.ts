import { StateEntity } from '../state.entity';

export class ReturnStateDto {
  id: number;
  name: string;
  stateCode: string;
  phonePrefixes: string[];

  constructor(state: StateEntity) {
    this.id = state.id;
    this.name = state.name;
    this.stateCode = state.stateCode;
    this.phonePrefixes = state.phonePrefixes;
  }
}