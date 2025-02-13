import { render, screen } from "@testing-library/react";
import { URL_CONFIG } from "@/utils/config";
import { PokemonImage } from "./pokemon-image";
import mockedPokemon from "@/test/mocks/pikachu.json";
import { Pokemon } from "@/store/slices/pokemon/types";

describe("PokemonImage Component", () => {
  const mockPokemon = mockedPokemon as unknown as Pokemon;

  it("should render null if pokemon is undefined", () => {
    const { container } = render(<PokemonImage pokemon={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render the image with the correct src when pokemon is provided", () => {
    render(<PokemonImage pokemon={{ ...mockPokemon }} />);

    const image = screen.getByRole("img", { name: /pikachu/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `${URL_CONFIG["official-artwork"]}/25.png`,
    );
  });

  it("should use the fallback URL if official artwork is not available", () => {
    const pokemonWithoutArtwork = {
      ...mockPokemon,
      sprites: {
        ...mockPokemon.sprites,
        other: {
          ...(mockPokemon.sprites.other as unknown as Record<string, string>),
          "official-artwork": {
            front_default: "",
          },
        },
      },
    };

    render(
      <PokemonImage pokemon={pokemonWithoutArtwork as unknown as Pokemon} />,
    );

    const image = screen.getByRole("img", { name: /pikachu/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `${URL_CONFIG["official-artwork"]}/25.png`,
    );
  });

  it("should render the image with the correct width and height", () => {
    render(<PokemonImage pokemon={mockPokemon} />);

    const image = screen.getByRole("img", { name: /pikachu/i });
    expect(image).toHaveAttribute("width", "205");
    expect(image).toHaveAttribute("height", "205");
  });
});
