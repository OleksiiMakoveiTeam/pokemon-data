import { Stack, Typography, Chip } from "@mui/material";
import { isValidType } from "@/pages/single-pokemon/single-pokemon";
import { Pokemon } from "@/store/slices/pokemon/types";
import { TYPE_COLOR_MAP } from "@/utils/config";
import { useTranslation } from "react-i18next";

export const PokemonType = ({ pokemon }: { pokemon?: Pokemon }) => {
  const { t } = useTranslation();
  if (!pokemon) return null;

  return (
    <Stack
      p={1}
      spacing={2}
      display="flex"
      flexDirection="column"
      bgcolor="white"
      color="black"
    >
      {!!pokemon?.types.length && (
        <Typography variant="h6">{t("PokemonType.types")}</Typography>
      )}

      {(pokemon?.types || []).map((type) => (
        <Chip
          key={type.type.name}
          sx={{
            backgroundColor:
              (isValidType(type?.type?.name) &&
                TYPE_COLOR_MAP?.[type?.type?.name]) ||
              "gray",
          }}
          label={<Typography key={type.type.name}>{type.type.name}</Typography>}
        />
      ))}

      {!pokemon?.types?.length && (
        <Typography>{t("PokemonType.noTypes")}</Typography>
      )}

      {!!pokemon?.weakness?.length && (
        <Typography variant="h6">{t("PokemonType.weaknesses")}</Typography>
      )}

      {(pokemon?.weakness || []).map((type) => (
        <Chip
          key={type}
          sx={{
            backgroundColor:
              (isValidType(type) && TYPE_COLOR_MAP?.[type]) || "gray",
          }}
          label={<Typography key={type}>{type}</Typography>}
        />
      ))}
      {!pokemon?.weakness?.length && (
        <Typography>{t("PokemonType.noWeaknesses")}</Typography>
      )}
    </Stack>
  );
};
