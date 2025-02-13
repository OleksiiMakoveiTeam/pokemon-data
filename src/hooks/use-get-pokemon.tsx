import {
  useGetPokemonByNameQuery,
  useGetPokemonEvolutionChainQuery,
  useGetPokemonSpeciesQuery,
  useGetPokemonTypeQuery,
} from "@/store/slices/pokemon/pokemon";
import {
  Pokemon,
  PokemonEvolutionChainDetails,
  PokemonSpeciesDetails,
  PokemonTypeDetails,
} from "@/store/slices/pokemon/types";
import { useEffect, useMemo, useState } from "react";

const getExtendedPokemonType = (type?: PokemonTypeDetails) => {
  if (!type) return {};

  return {
    weakness: type?.damage_relations.double_damage_from.map((t) => t.name),
  };
};

export const useGetPokemon = (name?: Pokemon["name"]) => {
  const [pokemonData, setPokemonData] = useState<Pokemon | undefined>(void 0);
  const [weakness, setWeakness] = useState<string[]>([]);
  const [evolutionChainData, setEvolutionChain] = useState<
    PokemonEvolutionChainDetails | undefined
  >(void 0);
  const [speciesData, setSpecies] = useState<PokemonSpeciesDetails | undefined>(
    void 0,
  );

  const {
    data: pokemon,
    error: errorLoadingPokemon,
    isLoading: isLoadingPokemon,
  } = useGetPokemonByNameQuery(name ?? "", {
    skip: !name,
  });

  const { data: type } = useGetPokemonTypeQuery(
    pokemon?.types[0].type.url.split("/")[6] || "",
    {
      skip: !pokemon,
    },
  );

  const { data: species } = useGetPokemonSpeciesQuery(
    pokemon?.species?.url?.split("/")[6] || "",
    {
      skip: !pokemon,
    },
  );

  const evolutionChainId = useMemo(() => {
    if (speciesData) {
      return Number(speciesData?.evolution_chain?.url?.split("/")[6]) ?? void 0;
    }
  }, [speciesData]);

  const { data: evolutionChain } = useGetPokemonEvolutionChainQuery(
    evolutionChainId ?? -1,
    {
      skip: !evolutionChainId,
    },
  );

  useEffect(() => {
    if (species) {
      setSpecies(species ?? void 0);
    }
  }, [species]);

  useEffect(() => {
    if (evolutionChain) {
      setEvolutionChain(evolutionChain);
    }
  }, [evolutionChain]);

  // Retrieving here only one type, but in the future we might want to extend this
  const extendedType = useMemo(() => getExtendedPokemonType(type), [type]);

  useEffect(() => {
    if (pokemon) {
      setPokemonData(pokemon);
    }
  }, [pokemon]);

  useEffect(() => {
    if (extendedType.weakness) {
      setWeakness(extendedType.weakness);
    }
  }, [extendedType]);

  return {
    data: pokemonData ? { ...pokemonData, weakness } : undefined,
    chain: evolutionChainData,
    error: errorLoadingPokemon,
    isLoading: isLoadingPokemon,
  };
};
