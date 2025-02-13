import { fireEvent, screen } from "@testing-library/react";
import {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
} from "@/store/slices/pokemon/pokemon";
import { PokedexPage } from "@/pages/pokedex/pokedex";
import { useTranslation } from "react-i18next";
import { renderWithProviders } from "@/test/utils";

jest.mock("@/store/slices/pokemon/pokemon", () => ({
  useGetAllPokemonsQuery: jest.fn(),
  useGetPokemonByNameQuery: jest.fn(),
  usePrefetch: jest.fn(),
}));
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("PokedexPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslation as jest.Mock).mockReturnValue({
      //@ts-ignore
      t: jest.fn((t) => t),
    });
  });

  it("Displays a loading message when fetching Pokémon list", () => {
    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    renderWithProviders(<PokedexPage />);

    expect(screen.getByText("PokedexPage.loadingMessage")).toBeInTheDocument();
  });

  it("Displays an error message if API request fails", () => {
    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: { message: "Network error" },
    });

    renderWithProviders(<PokedexPage />);

    expect(screen.getByText("PokedexPage.generalError")).toBeInTheDocument();
  });

  it("Displays Pokémon list when API returns data", async () => {
    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
        ],
        count: 2,
      },
      error: null,
    });

    renderWithProviders(<PokedexPage />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });

  it("Displays single Pokémon when searching", async () => {
    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: null,
    });

    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        name: "pikachu",
        sprites: { front_default: "https://example.com/pikachu.png" },
      },
      error: null,
    });

    renderWithProviders(<PokedexPage />);

    const input = screen.getByPlaceholderText("PokedexPage.searchPlaceholder");
    fireEvent.change(input, { target: { value: "pikachu" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(await screen.findByText("pikachu")).toBeInTheDocument();
  });

  it("Handles pagination correctly", async () => {
    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
        ],
        count: 100,
      },
      error: null,
    });

    renderWithProviders(<PokedexPage />);

    const nextPageButton = screen.getByRole("button", { name: /next/i });
    expect(nextPageButton).toBeInTheDocument();

    fireEvent.click(nextPageButton);
    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
  });
});
