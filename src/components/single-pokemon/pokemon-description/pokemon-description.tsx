import { Stack, Box, Typography } from "@mui/material";
import { Pokemon } from "@/store/slices/pokemon/types";
import { calculateHeight } from "@/utils/calculate-height";
import { calculateWeight } from "@/utils/calculate-weight";
import { useTranslation } from "react-i18next";

export const PokemonDescription = ({ pokemon }: { pokemon?: Pokemon }) => {
  const { t } = useTranslation();

  // Early return if pokemon is not provided
  if (!pokemon) return null;

  return (
    <Stack bgcolor="#30a7d7" p={2} aria-label="Pokemon Description">
      {/* Name */}
      <Box>
        <Typography variant="h6" aria-label="Pokemon Name">
          {t("PokemonDescription.name")}
        </Typography>
        <Typography>{pokemon.name}</Typography>
      </Box>

      {/* Height */}
      <Box>
        <Typography variant="h6" aria-label="Pokemon Height">
          {t("PokemonDescription.height")}
        </Typography>
        <Typography>{calculateHeight(pokemon.height)}</Typography>
      </Box>

      {/* Weight */}
      <Box>
        <Typography variant="h6" aria-label="Pokemon Weight">
          {t("PokemonDescription.weight")}
        </Typography>
        <Typography>{calculateWeight(pokemon.weight)}</Typography>
      </Box>
    </Stack>
  );
};
