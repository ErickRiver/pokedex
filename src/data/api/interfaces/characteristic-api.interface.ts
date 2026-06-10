import { ApiResourceRef } from './paginated-api.interface';

export interface CharacteristicApi {
  id: number;  
  descriptions: CharacteristicDescriptionApi[];
  gene_modulo: number;
  possible_values: number[];
  highest_stat: ApiResourceRef;
}

export interface CharacteristicDescriptionApi {
  description: string;
  language: ApiResourceRef;
}
