import { screen } from "@testing-library/react";
import { SinglePokemonPage } from "@/pages/single-pokemon/single-pokemon";
import { useGetPokemon } from "@/hooks/use-get-pokemon";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import mockedPikachu from "@/test/mocks/pikachu.json";
import mockedChain from "@/test/mocks/evolution-chain.json";
import { renderWithProviders } from "@/test/utils";

jest.mock("@/hooks/use-get-pokemon");

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("react-router", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("SinglePokemonPage Component", () => {
  const mockPokemon = mockedPikachu;

  const mockEvolutionChain = mockedChain;

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslation as jest.Mock).mockReturnValue({
      t: jest.fn((key) => key),
    });

    (useParams as jest.Mock).mockReturnValue({ id: "pikachu" });
  });

  it("Displays a loading message when fetching Pokémon data", () => {
    (useGetPokemon as jest.Mock).mockReturnValue({
      data: null,
      chain: null,
      isLoading: true,
    });

    renderWithProviders(<SinglePokemonPage />);

    expect(
      screen.getByText("SinglePokemonPage.loadingMessage"),
    ).toBeInTheDocument();
  });

  it("Displays an error message if Pokémon is not found", () => {
    (useGetPokemon as jest.Mock).mockReturnValue({
      data: null,
      chain: null,
      isLoading: false,
    });

    renderWithProviders(<SinglePokemonPage />);

    expect(
      screen.getByText("SinglePokemonPage.pokemonNotFound"),
    ).toBeInTheDocument();
  });

  it("Displays Pokémon details when data is available", () => {
    (useGetPokemon as jest.Mock).mockReturnValue({
      data: mockPokemon,
      chain: mockEvolutionChain,
      isLoading: false,
    });

    renderWithProviders(<SinglePokemonPage />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();

    const pokemonImage = screen.getByRole("img", { name: /pikachu/i });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute(
      "src",
      mockPokemon.sprites.other["official-artwork"].front_default,
    );

    expect(screen.getByText(/raichu/i)).toBeInTheDocument();
  });

  it("Displays Pokémon type correctly", () => {
    (useGetPokemon as jest.Mock).mockReturnValue({
      data: mockPokemon,
      chain: mockEvolutionChain,
      isLoading: false,
    });

    renderWithProviders(<SinglePokemonPage />);

    expect(screen.getByText("electric")).toBeInTheDocument();
  });

  it("Displays Pokémon weaknesses correctly", () => {
    (useGetPokemon as jest.Mock).mockReturnValue({
      data: mockPokemon,
      chain: mockEvolutionChain,
      isLoading: false,
    });

    renderWithProviders(<SinglePokemonPage />);

    expect(screen.getByText("ground")).toBeInTheDocument();
  });

  it("Displays default type color if Pokémon type is invalid", () => {
    const invalidTypePokemon = {
      ...mockPokemon,
      types: [{ type: { name: "invalidType" } }],
    };

    (useGetPokemon as jest.Mock).mockReturnValue({
      data: invalidTypePokemon,
      chain: mockEvolutionChain,
      isLoading: false,
    });

    renderWithProviders(<SinglePokemonPage />);

    const typeElement = screen.getByText("invalidType");
    expect(typeElement).toBeInTheDocument();
  });
});
