import { PokemonVersionsApi } from "../../data/api/interfaces";

/** Builds official artwork URL from PokeAPI sprite payload when missing. */
export function resolveOfficialArtworkUrl(sprites: {
  front_default: string | null;
  other?: { 'official-artwork'?: { front_default: string | null } };
}): string {
  return (
    sprites.other?.['official-artwork']?.front_default ??
    sprites.front_default ??
    ''
  );
}

export function resolvePokemonIconUrl(versions: {
  versions: PokemonVersionsApi;
}): string {
  return versions.versions['generation-viii'].icons.front_default ?? '';
} 

export function resolveOfficialCryUrl(cries: {
  latest: string | null;
  legacy: string | null;
}): string {
  return cries.legacy ?? cries.latest ?? '';
} 

export function extractIdFromUrl(url: string): string {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? match[1] : '';
}