/** Theme tokens per Pokémon type (first / primary type). Adjust colors as needed. */
export interface PokemonTypeTheme {
  layoutBackground: string;
  textPrimary: string;
  textSecondary: string;
}

export const POKEMON_TYPE_THEMES: Record<string, PokemonTypeTheme> = {
  normal: {
    layoutBackground: 'var(--type-normal)',
    textPrimary: 'rgba(28, 28, 28, 0.7)',
    textSecondary: 'rgba(28, 28, 28)',
  },
  fire: {
    layoutBackground: 'var(--type-fire)',
    textPrimary: 'rgba(28, 28, 28, 0.7)',
    textSecondary: 'rgba(28, 28, 28)',
  },
  water: {
    layoutBackground: 'var(--type-water)',
    textPrimary: 'rgba(255, 255, 255, 0.7)',
    textSecondary: 'rgba(255, 255, 255)',
  },
  grass: {
    layoutBackground: 'var(--type-grass)',
    textPrimary: 'rgba(255, 255, 255, 0.7)',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
  },
  electric: {
    layoutBackground: 'var(--type-electric)',
    textPrimary: 'rgba(0, 0, 0, 0.7)',
    textSecondary: 'rgba(28, 28, 28)',
  },
  ice: {
    layoutBackground: 'var(--type-ice)',
    textPrimary: 'rgba(255, 255, 255, 0.7)',
    textSecondary: 'rgba(255, 255, 255)',
  },
  fighting: {
    layoutBackground: 'var(--type-fighting)',
    textPrimary: 'rgba(255, 255, 255, 0.7)',
    textSecondary: 'rgba(255, 255, 255)',
  },
  poison: {
    layoutBackground: 'var(--type-poison)',
    textPrimary: 'rgba(255, 255, 255, 0.7)',
    textSecondary: 'rgba(255, 255, 255)',
  },
  ground: {
    layoutBackground: 'var(--type-ground)',
    textPrimary: 'rgba(0, 0, 0, 0.7)',
    textSecondary: 'rgba(28, 28, 28)',
  },
  flying: {
    layoutBackground: 'var(--type-flying)',
    textPrimary: 'rgba(255, 255, 255, 0.7)',
    textSecondary: 'rgba(255, 255, 255)',
  },
  psychic: {
    layoutBackground: 'var(--type-psychic)',
    textPrimary: 'rgba(255, 255, 255, 0.7)',
    textSecondary: 'rgba(255, 255, 255)',
  },
  bug: {
    layoutBackground: 'var(--type-bug)',
    textPrimary: 'rgba(0, 0, 0, 0.7)',
    textSecondary: 'rgba(28, 28, 28)',
  },
  rock: {
    layoutBackground: 'var(--type-rock)',
    textPrimary: 'rgba(0, 0, 0, 0.7)',
    textSecondary: 'rgba(28, 28, 28)',
  },
  ghost: {
    layoutBackground: 'var(--type-ghost)',
    textPrimary: 'rgba(255, 255, 255, 0.7)',
    textSecondary: 'rgba(255, 255, 255)',
  },
  dark: {
    layoutBackground: 'var(--type-dark)',
    textPrimary: 'rgba(255, 255, 255, 0.70)',
    textSecondary: 'rgba(255, 255, 255)',
  },
  dragon: {
    layoutBackground: 'var(--type-dragon)',
    textPrimary: 'rgba(255, 255, 255, 0.7)',
    textSecondary: 'rgba(255, 255, 255)',
  },
  steel: {
    layoutBackground: 'var(--type-steel)',
    textPrimary: 'rgba(0, 0, 0, 0.7)',
    textSecondary: 'rgba(28, 28, 28)',
  },
  fairy: {
    layoutBackground: 'var(--type-fairy)',
    textPrimary: 'rgba(0, 0, 0, 0.7)',
    textSecondary: 'rgba(28, 28, 28)',
  },
};

export const DEFAULT_TYPE_THEME: PokemonTypeTheme = {
  layoutBackground: 'var(--color-bg)',
  textPrimary: 'var(--color-text)',
  textSecondary: 'var(--color-text)',
};
