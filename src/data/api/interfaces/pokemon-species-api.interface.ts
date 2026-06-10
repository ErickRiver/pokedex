import { ApiResourceRef } from './paginated-api.interface';

export interface FlavorTextEntryApi {
  flavor_text: string;
  language: ApiResourceRef;
  version: ApiResourceRef;
}

export interface NamesApi {
  name: string;
  language: ApiResourceRef;
}

export interface PokemonSpeciesApi {
  id: number;
  name: string;  
  names: NamesApi[];      
  evolution_chain: ApiResourceRef;
  flavor_text_entries: FlavorTextEntryApi[];
  generation: ApiResourceRef;
}
