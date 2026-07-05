import { environment } from '../../environments/environment';

const baseHref =
  environment.baseHref === '/' ? '' : environment.baseHref.replace(/\/$/, '');

export const ASSETS_BASE = `${baseHref}/assets`;
export const ASSETS_IMAGES_BASE = `${ASSETS_BASE}/images`;
export const ASSETS_ICONS_BASE = `${ASSETS_BASE}/icons`;
export const ASSETS_GIFS_BASE = `${ASSETS_BASE}/gifs`;

export const IMAGES = {
  logo: `${ASSETS_IMAGES_BASE}/logos/logo.png`,
  missing_no: `${ASSETS_IMAGES_BASE}/pokemon/missing-no.png`,
  pokeball: `${ASSETS_IMAGES_BASE}/pokemon/pokeball.png`,
  pokeball_star: `${ASSETS_IMAGES_BASE}/pokemon/pokeball-star.png`,
};

export const GIFS = {
  pikachu: `${ASSETS_GIFS_BASE}/pikachu.gif`,
  pokeball: `${ASSETS_GIFS_BASE}/pokeball.gif`,
};

export const ICONS = {
  sun: `${ASSETS_ICONS_BASE}/sun.png`,
  moon: `${ASSETS_ICONS_BASE}/moon.png`,
  type_bug: `${ASSETS_ICONS_BASE}/types/bug.svg `,
  type_dark: `${ASSETS_ICONS_BASE}/types/dark.svg`,
  type_dragon: `${ASSETS_ICONS_BASE}/types/dragon.svg`,
  type_electric: `${ASSETS_ICONS_BASE}/types/electric.svg`,
  type_fairy: `${ASSETS_ICONS_BASE}/types/fairy.svg`,
  type_fighting: `${ASSETS_ICONS_BASE}/types/fighting.svg`,
  type_fire: `${ASSETS_ICONS_BASE}/types/fire.svg`,
  type_flying: `${ASSETS_ICONS_BASE}/types/flying.svg`,
  type_ghost: `${ASSETS_ICONS_BASE}/types/ghost.svg`,
  type_grass: `${ASSETS_ICONS_BASE}/types/grass.svg`,
  type_ground: `${ASSETS_ICONS_BASE}/types/ground.svg`,
  type_ice: `${ASSETS_ICONS_BASE}/types/ice.svg`,
  type_normal: `${ASSETS_ICONS_BASE}/types/normal.svg`,
  type_poison: `${ASSETS_ICONS_BASE}/types/poison.svg`,
  type_psychic: `${ASSETS_ICONS_BASE}/types/psychic.svg`,
  type_rock: `${ASSETS_ICONS_BASE}/types/rock.svg`,
  type_steel: `${ASSETS_ICONS_BASE}/types/steel.svg`,
  type_water: `${ASSETS_ICONS_BASE}/types/water.svg`,
};