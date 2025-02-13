import { render, screen } from "@testing-library/react";

import { PokemonDescription } from "./pokemon-description";
import mockedPokeman from "@/test/mocks/pikachu.json";
import { Pokemon } from "@/store/slices/pokemon/types";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (t: string) => t,
  }),
}));

describe("PokemonDescription", () => {
  const mockPokemon = mockedPokeman as unknown as Pokemon;

  it("should render null if pokemon is undefined", () => {
    const { container } = render(<PokemonDescription pokemon={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render the Pokémon's name, height, and weight correctly", () => {
    render(<PokemonDescription pokemon={mockPokemon} />);

    expect(screen.getByText("PokemonDescription.name")).toBeInTheDocument();
    expect(screen.getByText("pikachu")).toBeInTheDocument();

    expect(screen.getByText("PokemonDescription.height")).toBeInTheDocument();
    expect(screen.getByText("1ft 4in")).toBeInTheDocument();

    expect(screen.getByText("PokemonDescription.weight")).toBeInTheDocument();
    expect(screen.getByText("13.2")).toBeInTheDocument();
  });

  it("should use the translation keys correctly", () => {
    render(<PokemonDescription pokemon={mockPokemon} />);

    expect(screen.getByText("PokemonDescription.name")).toBeInTheDocument();
    expect(screen.getByText("PokemonDescription.height")).toBeInTheDocument();
    expect(screen.getByText("PokemonDescription.weight")).toBeInTheDocument();
  });
});
