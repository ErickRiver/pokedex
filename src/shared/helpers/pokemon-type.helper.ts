import { PokemonTypeSlotApi } from '../../data/api/interfaces';

/** Returns primary type slug (slot 1, or first entry). */
export function getPrimaryTypeName(types: PokemonTypeSlotApi[]): string | null {
  if (!types.length) {
    return null;
  }
  const primary = types.find((t) => t.slot === 1) ?? types[0];
  return primary.type.name;
}
