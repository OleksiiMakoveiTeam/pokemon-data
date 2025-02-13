import {
  useGetPokemonByNameQuery,
  useGetPokemonTypeQuery,
  useGetPokemonSpeciesQuery,
  useGetPokemonEvolutionChainQuery,
} from "@/store/slices/pokemon/pokemon";

import { renderHook } from "@testing-library/react";
import { useGetPokemon } from "./use-get-pokemon";
import mockedPikachu from "@/test/mocks/pikachu.json";
import mockedChain from "@/test/mocks/evolution-chain.json";
import mockedSpecies from "@/test/mocks/species.json";
import mockedType from "@/test/mocks/type.json";

// Mock RTK Query hooks
jest.mock("@/store/slices/pokemon/pokemon", () => ({
  useGetPokemonByNameQuery: jest.fn(),
  useGetPokemonTypeQuery: jest.fn(),
  useGetPokemonSpeciesQuery: jest.fn(),
  useGetPokemonEvolutionChainQuery: jest.fn(),
}));

describe("useGetPokemon Hook", () => {
  const mockPokemon = mockedPikachu;

  const mockType = mockedType;

  const mockSpecies = mockedSpecies;

  const mockEvolutionChain = mockedChain;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the RTK Query hooks
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    (useGetPokemonTypeQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    (useGetPokemonSpeciesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    (useGetPokemonEvolutionChainQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
  });

  it("should return loading state initially", () => {
    const { result } = renderHook(() => useGetPokemon("pikachu"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it("should return Pokémon data when all queries succeed", async () => {
    // Mock successful responses
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
    });
    (useGetPokemonTypeQuery as jest.Mock).mockReturnValue({
      data: mockType,
      error: undefined,
      isLoading: false,
    });
    (useGetPokemonSpeciesQuery as jest.Mock).mockReturnValue({
      data: mockSpecies,
      error: undefined,
      isLoading: false,
    });
    (useGetPokemonEvolutionChainQuery as jest.Mock).mockReturnValue({
      data: mockEvolutionChain,
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useGetPokemon("pikachu"));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({
      ...mockPokemon,
      weakness: ["ground"],
    });
    expect(result.current.chain).toEqual(mockEvolutionChain);
    expect(result.current.error).toBeUndefined();
  });

  it("should return error if Pokémon data fetching fails", async () => {
    // Mock error response for Pokémon data
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { message: "Failed to fetch Pokémon" },
      isLoading: false,
    });

    const { result } = renderHook(() => useGetPokemon("pikachu"));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual({
      message: "Failed to fetch Pokémon",
    });
  });

  it("should handle missing evolution chain", async () => {
    // Mock successful responses for Pokémon, type, and species, but no evolution chain
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
    });
    (useGetPokemonTypeQuery as jest.Mock).mockReturnValue({
      data: mockType,
      error: undefined,
      isLoading: false,
    });
    (useGetPokemonSpeciesQuery as jest.Mock).mockReturnValue({
      data: mockSpecies,
      error: undefined,
      isLoading: false,
    });
    (useGetPokemonEvolutionChainQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useGetPokemon("pikachu"));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({
      ...mockPokemon,
      weakness: ["ground"],
    });
    expect(result.current.chain).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it("should handle missing type data", async () => {
    // Mock successful responses for Pokémon and species, but no type data
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
    });
    (useGetPokemonTypeQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });
    (useGetPokemonSpeciesQuery as jest.Mock).mockReturnValue({
      data: mockSpecies,
      error: undefined,
      isLoading: false,
    });
    (useGetPokemonEvolutionChainQuery as jest.Mock).mockReturnValue({
      data: mockEvolutionChain,
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useGetPokemon("pikachu"));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({
      ...mockPokemon,
      weakness: [],
    });
    expect(result.current.chain).toEqual(mockEvolutionChain);
    expect(result.current.error).toBeUndefined();
  });
});
