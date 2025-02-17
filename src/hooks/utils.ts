import { PokemonTypeDetails } from "@/store/slices/pokemon/types";

// Due to how they structure their api and manage links, we need to extract the id from the link to fetch the pokemon data.
export const getIdFromLink = (link?: string) => {
  if (!link) return "";

  const id = link?.split("/")[6];

  if (!id) return "";

  return id;
};

export const getExtendedPokemonType = (type?: PokemonTypeDetails) => {
  if (!type) return {};

  return {
    weakness: type?.damage_relations.double_damage_from.map((t) => t.name),
  };
};
