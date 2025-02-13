import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Pokemon,
  PokemonEvolutionChainDetails,
  PokemonList,
  PokemonSpeciesDetails,
  PokemonTypeDetails,
} from "./types";

// can get it from env...
const BASE_URL = "https://pokeapi.co/api/v2/";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),

  tagTypes: [
    "Pokemon",
    "PokemonList",
    "PokemonType",
    "PokemonSpecies",
    "EvolutionChain",
  ],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      providesTags: (_result, _error, name) => [{ type: "Pokemon", id: name }],
    }),

    getAllPokemons: builder.query<
      PokemonList,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => `pokemon?limit=${limit}&offset=${offset}`,
      transformResponse: (response: PokemonList) => {
        return {
          ...response,
          totalCount: response.count,
        };
      },
    }),

    getPokemonType: builder.query<PokemonTypeDetails, string>({
      query: (name) => `type/${name}`,
      providesTags: (_result, _error, name) => [
        { type: "PokemonType", id: name },
      ],
    }),

    getPokemonSpecies: builder.query<PokemonSpeciesDetails, string>({
      query: (name) => `pokemon-species/${name}`,
      providesTags: (_result, _error, name) => [
        { type: "PokemonSpecies", id: name },
      ],
    }),

    getPokemonEvolutionChain: builder.query<
      PokemonEvolutionChainDetails,
      number
    >({
      query: (id) => `evolution-chain/${id}`,
      providesTags: (_result, _error, id) => [{ type: "EvolutionChain", id }],
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetAllPokemonsQuery,
  useGetPokemonTypeQuery,
  useGetPokemonEvolutionChainQuery,
  useGetPokemonSpeciesQuery,
  usePrefetch,
} = pokemonApi;
