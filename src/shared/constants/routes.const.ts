export const AppRoutes = {
  pokemon: '/pokemon',
  pokemonDetail: (idOrName: string | number) => `/pokemon/${idOrName}`,  
  favorites: '/favorites',
} as const;
