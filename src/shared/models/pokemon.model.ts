export interface PokemonType {
  slot: number;
  name: string;
}

export interface PokemonStat {
  name: string;
  baseValue: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonSummary {
  id: number;
  name: string;
  displayName: string;
  pokedexNumber: number;
  height: number;
  weight: number;
  imageUrl: string;
  types: PokemonType[];
}

export interface PokemonAbout {
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  baseExperience: number;
  description: string;
}

export interface PokemonDetail extends PokemonSummary {
  stats: PokemonStat[];
  about: PokemonAbout;
  evolutionChainId: number | null;
}
