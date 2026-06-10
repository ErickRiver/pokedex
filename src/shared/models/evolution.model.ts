export interface EvolutionNode {
  speciesId: number;
  speciesName: string;
  displayName: string;
  imageUrl: string;
  minLevel: number | null;
  evolvesTo: EvolutionNode[];
}
