import { ApiResourceRef } from './paginated-api.interface';

export interface EvolutionDetailApi {
  min_level: number | null;
  trigger: ApiResourceRef;
}

export interface ChainLinkApi {  
  evolution_details: EvolutionDetailApi[];
  evolves_to: ChainLinkApi[];
  species: ApiResourceRef;
}

export interface EvolutionChainApi {
  id: number;
  chain: ChainLinkApi;
}
