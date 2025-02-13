import { components } from "@/__generated/api/pokemon";

export type Pokemon = components["schemas"]["PokemonDetail"] & {
  weakness?: components["schemas"]["TypeDetail"]["damage_relations"]["double_damage_from"][number]["name"][];
};

export type PokemonList = components["schemas"]["PaginatedPokedexSummaryList"];

export type PokemonTypeDetails = components["schemas"]["TypeDetail"];

export type PokemonSpeciesDetails =
  components["schemas"]["PokemonSpeciesDetail"];

export type PokemonEvolutionChainDetails =
  components["schemas"]["EvolutionChainDetail"];
