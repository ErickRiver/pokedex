export const CacheKeys = {
  pokemonList: (offset: number, limit: number) => `pokemon:list:${offset}:${limit}`,
  pokemonDetail: (idOrName: string | number) => `pokemon:detail:${idOrName}`,
  pokemonSpecies: (idOrName: string | number) => `pokemon:species:${idOrName}`,
  evolutionChain: (url: string) => `evolution:chain:${url}`,
  generationList: 'generation:list',
  generationDetail: (id: number) => `generation:detail:${id}`,
  species: (id: number) => `species:${id}`,  
} as const;
