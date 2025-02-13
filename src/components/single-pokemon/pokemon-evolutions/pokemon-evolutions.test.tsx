import { screen } from "@testing-library/react";
import { useParams } from "react-router";
import { PokemonEvolutions } from "./pokemon-evolutions";
import mockedChain from "@/test/mocks/evolution-chain.json";
import { PokemonEvolutionChainDetails } from "@/store/slices/pokemon/types";
import { renderWithProviders } from "@/test/utils";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-router", () => ({
  useParams: jest.fn(() => ({ id: "pikachu" })),
  useNavigate: jest.fn(),
}));

describe("PokemonEvolutions", () => {
  const mockChain = mockedChain as unknown as PokemonEvolutionChainDetails;

  it("should render the evolution chain correctly", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "pikachu" });
    renderWithProviders(<PokemonEvolutions chain={mockChain} />);

    expect(screen.getByText(/pichu/i)).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/raichu/i)).toBeInTheDocument();
  });

  it("should display 'noEvolutions' message if the chain is empty", () => {
    renderWithProviders(<PokemonEvolutions chain={undefined} />);

    expect(
      screen.getByText("PokemonEvolutions.noEvolutions"),
    ).toBeInTheDocument();
  });
});
