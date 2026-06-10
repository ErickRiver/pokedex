export interface Characteristic {
  descriptions: string[];
}

export interface CharacteristicDescription {
  description: string;
  language: {
    name: string;
    url: string;
  };
}
