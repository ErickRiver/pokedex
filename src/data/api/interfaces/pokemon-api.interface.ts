import { ApiResourceRef } from './paginated-api.interface';

export interface PokemonTypeSlotApi {
  slot: number;
  type: ApiResourceRef;
}

export interface PokemonStatSlotApi {
  base_stat: number;
  effort: number;
  stat: ApiResourceRef;
}

export interface PokemonAbilitySlotApi {
  ability: ApiResourceRef;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSpritesApi {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };

  versions: PokemonVersionsApi;
}

export interface PokemonVersionsApi {
  "generation-vii": GenerationVII;
  "generation-viii": GenerationVIII;
}

export interface GenerationVII {
  icons: SpriteSetApi;
}

export interface GenerationVIII {
  icons: SpriteSetApi;
}

export interface SpriteSetApi {
  front_default: string | null;  
  front_female: string | null;
}

export interface PokemonGameIndicesApi {
  game_index: number;
  version: ApiResourceRef;
}


export interface PokemonCriesApi {
  latest: string;
  legacy: string;
}

export interface PokemonHeldItemsApi {
  item: ApiResourceRef;
  version_details: PokemonVersionDetailsApi[];
}

export interface PokemonVersionDetailsApi {
  rarity: number;
  version: ApiResourceRef;
}

export interface PokemonMoveApi {
  move: ApiResourceRef;
  version_group_details: PokemonVersionGroupDetailsApi[];
}

export interface PokemonVersionGroupDetailsApi {
  level_learned_at: number;
  move_learn_method: ApiResourceRef;
  version_group: ApiResourceRef;
}

export interface PokemonPastTypeApi {
  type: ApiResourceRef;
  version: ApiResourceRef;
}

export interface PokemonApi {
  id: number;
  name: string;
  height: number;
  weight: number;
  order: number;
  base_experience: number;
  sprites: PokemonSpritesApi;  
  types: PokemonTypeSlotApi[];
  stats: PokemonStatSlotApi[];
  abilities: PokemonAbilitySlotApi[];
  species: ApiResourceRef;
  cries: PokemonCriesApi;
  form: ApiResourceRef[];
  game_indices: PokemonGameIndicesApi[];
  held_items: PokemonHeldItemsApi[];
  location_area_encounters: string;
  moves: PokemonMoveApi[];  
}
