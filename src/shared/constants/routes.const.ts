export const AppRoutes = {
  pokemonDetail: (idOrName: string | number) => `/pokemon/${idOrName}`,
} as const;
