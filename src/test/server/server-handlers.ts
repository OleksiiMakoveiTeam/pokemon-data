import { rest } from "msw";

const mockPokemon = { name: "pikachu", id: 25 };
const mockPokemonList = { results: [{ name: "bulbasaur", url: "..." }] };
const mockPokemonType = { name: "electric", damage_relations: {} };
const mockPokemonSpecies = { name: "pikachu", habitat: { name: "forest" } };
const mockEvolutionChain = { chain: { evolves_to: [] } };

const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon/bulbasaur", (_, res, ctx) => {
    const mockApiResponse = {
      species: {
        name: "bulbasaur",
      },
      sprites: {
        front_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
      },
    };
    return res(ctx.json(mockApiResponse));
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/:name", async (_, res, ctx) => {
    return res(ctx.json(mockPokemon));
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon", async (_, res, ctx) => {
    return res(ctx.json(mockPokemonList));
  }),
  rest.get("https://pokeapi.co/api/v2/type/:name", async (_, res, ctx) => {
    return res(ctx.json(mockPokemonType));
  }),
  rest.get(
    "https://pokeapi.co/api/v2/pokemon-species/:name",
    async (_, res, ctx) => {
      return res(ctx.json(mockPokemonSpecies));
    },
  ),
  rest.get(
    "https://pokeapi.co/api/v2/evolution-chain/:id",
    async (_, res, ctx) => {
      return res(ctx.json(mockEvolutionChain));
    },
  ),
];

export { handlers };
