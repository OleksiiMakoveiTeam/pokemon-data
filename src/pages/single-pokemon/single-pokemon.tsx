import { Stack } from "@mui/material";
import { PokemonDescription } from "@/components/single-pokemon/pokemon-description/pokemon-description";
import { PokemonType } from "@/components/single-pokemon/pokemon-type/pokemon-type";
import { PokemonImage } from "@/components/pokemon-image/pokemon-image";
import { StatChart } from "@/components/single-pokemon/stat-chart/stat-chart";
import { useGetPokemon } from "@/hooks/use-get-pokemon";
import { TYPE_COLOR_MAP } from "@/utils/config";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { PokemonEvolutions } from "@/components/single-pokemon/pokemon-evolutions/pokemon-evolutions";

// Some guard fn to check if the type is valid
export const isValidType = (
  type: string,
): type is keyof typeof TYPE_COLOR_MAP => {
  return type in TYPE_COLOR_MAP;
};

export const SinglePokemonPage = () => {
  const { t } = useTranslation();

  // Id of the pokemon
  const { id: name } = useParams();

  const { data: pokemon, isLoading, chain } = useGetPokemon(name);

  if (!pokemon && isLoading) {
    return <Stack spacing={2}>{t("SinglePokemonPage.loadingMessage")}</Stack>;
  }

  if (!pokemon) {
    return <Stack spacing={2}>{t("SinglePokemonPage.pokemonNotFound")}</Stack>;
  }
  return (
    <>
      <Stack gap={2} display="flex" flexDirection={["column", "column", "row"]}>
        {/* Photo */}
        <Stack spacing={2} bgcolor="white" justifyContent="space-between">
          <PokemonImage pokemon={pokemon} />
          <StatChart stats={pokemon?.stats} />
        </Stack>

        <Stack
          maxWidth="400px"
          width={["100%", 300, 400]}
          height="fit-content"
          display="flex"
          flexDirection="column"
        >
          <Stack
            spacing={2}
            width={["100%", 400, 400]}
            maxWidth="400px"
            height="fit-content"
            display="flex"
            flexDirection="column"
          >
            <PokemonDescription pokemon={pokemon} />
          </Stack>

          <PokemonType pokemon={pokemon} />
        </Stack>
      </Stack>
      <PokemonEvolutions chain={chain} />
    </>
  );
};
