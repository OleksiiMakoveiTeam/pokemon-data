import {
  Autocomplete,
  Box,
  Card,
  Link,
  Pagination,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid2";

import { useTranslation } from "react-i18next";
import {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
  usePrefetch,
} from "@/store/slices/pokemon/pokemon";
import { useState } from "react";

import pokemonNames from "@/assets/pokemon-names.json";
import { red } from "@mui/material/colors";
import { URL_CONFIG } from "@/utils/config";
import { PokemonImage } from "@/components/pokemon-image/pokemon-image";

const GridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  width: "100%",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const LIMIT = 25;

export const PokedexPage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  // As an alternative we might want to use a debounce function
  // As well as use form to handle more inputs in the app
  const [searchTerm, setSearchTerm] = useState("");

  const isSearching = Boolean(searchTerm);

  // usually this paginated query would have a prop for searching specific pokemon
  // but since its not implemented in the api
  // once search is filled we will run useGetPokemonByNameQuery to retrieve the data
  const {
    data,
    error,
    isLoading: isLoadingList,
  } = useGetAllPokemonsQuery(
    {
      limit: LIMIT,
      offset: (currentPage - 1) * LIMIT,
    },
    { skip: isSearching },
  );

  const { data: pokemonData, isLoading: isLoadingPokemon } =
    useGetPokemonByNameQuery(searchTerm, { skip: !isSearching });

  const prefetchPokemon = usePrefetch("getPokemonByName");

  return (
    <>
      {/* Top header */}
      <Stack
        display="flex"
        width="100%"
        spacing={2}
        justifyItems="center"
        alignItems="center"
      >
        <Paper
          sx={{
            width: ["100%", "80%"],
            height: [100],
            display: "flex",
            justifyItems: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography sx={{ opacity: 0.6 }} variant="subtitle1">
            {t("PokedexPage.pokedex")}
          </Typography>
        </Paper>
      </Stack>
      {/* Search component*/}
      <Stack
        display="flex"
        width="100%"
        spacing={2}
        justifyItems="center"
        alignItems="center"
        my="20px"
      >
        <Paper
          sx={{
            color: "white",
            backgroundColor: "transparent",
            width: ["100%", "80%"],
            display: "flex",
            justifyItems: "flex-start",
            alignItems: "center",
            flexDirection: ["column", "row"],
            gap: "20px",
          }}
        >
          <Box display="flex" flexDirection="column" px={["20px", 0]} gap={2}>
            <Typography>{t("PokedexPage.nameOrNumber")}</Typography>
            <Box display="flex" alignItems={"center"}>
              <Autocomplete
                clearOnEscape
                disablePortal
                options={pokemonNames}
                onChange={(_, val) => setSearchTerm(val?.label || "")}
                sx={{ width: 300, bgcolor: "white", height: "100%" }}
                renderInput={(params) => (
                  <TextField
                    onKeyDown={(e) => {
                      const value = (e.target as HTMLInputElement).value;
                      if (e.code.toLocaleLowerCase() === "enter" && value) {
                        setSearchTerm(value);
                      }
                    }}
                    placeholder={t("PokedexPage.searchPlaceholder")}
                    {...params}
                  />
                )}
              />
            </Box>
          </Box>
          <Box width={["70%", "50%"]}>
            <Card sx={{ backgroundColor: "#4dad5b", color: "white" }}>
              <Typography fontSize="20px">
                {t("PokedexPage.searchDescription")}
              </Typography>
            </Card>
          </Box>
        </Paper>
      </Stack>

      {/* List of pokemons */}
      <Stack bgcolor="white" display="flex" width="100%" spacing={2}>
        <Stack spacing={2} width="100%" sx={{ placeItems: "center" }} pt={2}>
          <Typography color="black">{t("PokedexPage.explore")}</Typography>
        </Stack>
        <Grid
          pt={4}
          container
          spacing={1}
          sx={{ placeContent: "center" }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          columns={12}
        >
          {error && (
            <Typography color={red["500"]}>
              {t("PokedexPage.generalError")}
            </Typography>
          )}

          {isLoadingList || isLoadingPokemon ? (
            <Typography>{t("PokedexPage.loadingMessage")}</Typography>
          ) : null}

          {!isSearching &&
            (data?.results || []).map(({ name, url }) => {
              // get the id from the url
              // ideally i would have a static asset uploaded somewhere like s3 bucket
              // But thats how the api works as well, it loads it directly from the raw githubusercontent
              // the example of the url is https://pokeapi.co/api/v2/pokemon/51/"
              const id = url.split("/")[6];

              return (
                <Grid
                  size={[12, 12, 6, 4]}
                  sx={{
                    px: [5, 10],
                  }}
                  key={name}
                >
                  <GridItem onMouseOver={() => prefetchPokemon(name)}>
                    <Link
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      href={"/single-pokemon/" + name}
                    >
                      <img
                        style={{ marginInline: "auto" }}
                        width={205}
                        height={205}
                        src={`${URL_CONFIG["official-artwork"]}/${id}.png`}
                        alt={name}
                      />
                      <Typography>{name}</Typography>
                    </Link>
                    <Typography>#{id}</Typography>
                  </GridItem>
                </Grid>
              );
            })}

          {/* Single pokemon */}

          {/* There would a problem with image loading(its going to stack for a moment)
         I would suggest to use a placeholder image or a skeleton loader
         */}
          {isSearching && !isLoadingPokemon && pokemonData && (
            <Grid
              size={[12, 12, 6, 4]}
              sx={{
                width: "100%",
                px: [5, 10],
                cursor: "pointer",
              }}
            >
              <GridItem>
                <Link href={"/single-pokemon/" + pokemonData.name}>
                  <PokemonImage pokemon={pokemonData} />

                  <Typography>{pokemonData.name}</Typography>
                </Link>
              </GridItem>
            </Grid>
          )}
        </Grid>

        <Pagination
          sx={{
            py: 10,
            width: "100%",
            justifyItems: "center",
            alignItems: "center",

            "& > .MuiPagination-ul": {
              justifyContent: "center",
            },
          }}
          count={Math.round((data?.count ?? 0) / LIMIT) || 0}
          disabled={isSearching || !!error}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          showFirstButton
          showLastButton
        />
      </Stack>
    </>
  );
};
