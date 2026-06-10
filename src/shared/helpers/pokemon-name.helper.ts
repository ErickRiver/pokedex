import { NamesApi } from "../../data/api/interfaces";

const generationHash = {
  'generation-i': 'Kanto',
  'generation-ii': 'Johto ',
  'generation-iii': 'Hoenn',
  'generation-iv': 'Sinnoh',
  'generation-v': 'Unova',
  'generation-vi': 'Kalos',
  'generation-vii': 'Alola',
  'generation-viii': 'Galar',
  'generation-ix': 'Paldea',
}

export function formatPokemonDisplayName(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatPokemonNameToJapanese(names: NamesApi[]): string {
  return names.find((name) => name.language.name === 'ja')?.name ?? '';
}

export function resolvePokemonGeneration(generation: string): string {
  return generationHash[generation as keyof typeof generationHash] ?? '';
}