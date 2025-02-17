import { NotFoundPage } from "@/pages/404/404-page";
import { PokedexPage } from "@/pages/pokedex/pokedex";
import { SinglePokemonPage } from "@/pages/single-pokemon/single-pokemon";

export enum ROUTE_PATHS {
  POKEDEX = "/",
  SINGLE_POKEMON = "/single-pokemon/:id",
  ANY_PAGE = "*",
}
export const COMPONENT_MAP_TO_ROUTE = {
  [ROUTE_PATHS.POKEDEX]: PokedexPage,
  [ROUTE_PATHS.SINGLE_POKEMON]: SinglePokemonPage,
  [ROUTE_PATHS.ANY_PAGE]: NotFoundPage,
};

export type ROUTE_PATHS_TYPES = keyof typeof ROUTE_PATHS;
