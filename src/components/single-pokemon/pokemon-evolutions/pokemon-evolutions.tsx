import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import { PokemonImage } from "@/components/pokemon-image/pokemon-image";
import { useGetPokemonByNameQuery } from "@/store/slices/pokemon/pokemon";
import { PokemonEvolutionChainDetails } from "@/store/slices/pokemon/types";
import { PokemonType } from "../pokemon-type/pokemon-type";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

const Evolution = ({
  name,
  isSelected,
}: {
  name?: string;
  isSelected: boolean;
}) => {
  const navigate = useNavigate();
  const { data: pokemon } = useGetPokemonByNameQuery(name ?? "", {
    skip: !name,
  });

  return (
    <ListItem
      onClick={() => {
        navigate(`/single-pokemon/${name}`);
      }}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      aria-label={`Evolution ${name}`}
    >
      <Stack
        borderRadius="50%"
        overflow="hidden"
        border={`2px solid ${isSelected ? "yellow" : "red"}`}
      >
        <PokemonImage pokemon={pokemon} />
      </Stack>
      <Typography>
        {name} #{pokemon?.id}
      </Typography>
      <PokemonType pokemon={pokemon} />
    </ListItem>
  );
};

export const PokemonEvolutions = ({
  chain,
}: {
  chain?: PokemonEvolutionChainDetails;
}) => {
  const { id: pokemonName } = useParams();
  const { t } = useTranslation();

  if (!chain) {
    return (
      <Typography sx={{ alignSelf: "center" }} variant="h6">
        {t("PokemonEvolutions.noEvolutions")}
      </Typography>
    );
  }

  const firstPokemon = chain.chain.species.name;
  const secondPokemon = chain.chain.evolves_to[0]?.species.name;
  // the problem is that evolves_to has a nested property but not specified in the auto generated type, but we don't really care about it
  // As if it is undefined it means there is no evolution chain further
  // And we will filter it out
  // @ts-expect-error
  const thirdPokemon = chain.chain.evolves_to[0]?.evolves_to?.[0]?.species.name;

  const evolutionChain = [firstPokemon, secondPokemon, thirdPokemon].filter(
    Boolean,
  );

  return (
    <Stack
      mt={10}
      gap={2}
      display="flex"
      flexDirection={["column"]}
      width="100%"
      bgcolor="white"
      height="fit-content"
      color="black"
      aria-label="Pokemon Evolutions"
    >
      <Typography sx={{ alignSelf: "center" }} variant="h6">
        {t("PokemonEvolutions.evolutions")}
      </Typography>
      {evolutionChain.length > 0 ? (
        <Box px={5}>
          <List
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-evenly",
              flexDirection: ["column", "column", "row"],
            }}
          >
            {evolutionChain.map((name) => (
              <Evolution
                key={name}
                name={name}
                isSelected={name === pokemonName}
              />
            ))}
          </List>
        </Box>
      ) : (
        <Typography sx={{ alignSelf: "center" }} variant="h6">
          {t("PokemonEvolutions.noEvolutions")}
        </Typography>
      )}
    </Stack>
  );
};
