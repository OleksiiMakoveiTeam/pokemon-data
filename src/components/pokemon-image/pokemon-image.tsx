import { Pokemon } from "@/store/slices/pokemon/types";
import { URL_CONFIG } from "@/utils/config";

export const PokemonImage = ({ pokemon }: { pokemon?: Pokemon }) => {
  if (!pokemon) return null;

  return (
    <img
      style={{ marginInline: "auto" }}
      src={
        (
          pokemon?.sprites?.other as unknown as Record<
            string,
            { front_default?: string }
          >
        )["official-artwork"]?.front_default ||
        `${URL_CONFIG["official-artwork"]}/${pokemon.id}.png`
      }
      alt={pokemon.name}
      width={205}
      height={205}
    />
  );
};
