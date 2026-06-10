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

export function resolveOfficialCryUrl(cries: {
  latest: string | null;
  legacy: string | null;
}): string {
  return cries.legacy ?? cries.latest ?? '';
} 