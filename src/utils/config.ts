// some config utility to store data that is used across the app

export const URL_CONFIG = {
  BASE_URL: "https://pokeapi.co/api/v2/",
  "official-artwork":
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork",
};

// Used for types of pokemon to retrieve the color
// Map of colors for each type
// Better to have a certain types for the keys
// Alternate way to dynamically fetch all the types from the api
export const TYPE_COLOR_MAP = {
  ["fire"]: "#F08030",
  ["electric"]: "#F8D030",
  ["grass"]: "#78C850",
  ["water"]: "#6890F0",
  ["bug"]: "#A8B820",
  ["normal"]: "#A8A878",
  ["poison"]: "#A040A0",
  ["ground"]: "#E0C068",
  ["fairy"]: "#EE99AC",
  ["fighting"]: "#C03028",
  ["psychic"]: "#F85888",
  ["rock"]: "#B8A038",
  ["ghost"]: "#705898",
  ["ice"]: "#98D8D8",
  ["dragon"]: "#7038F8",
  ["dark"]: "#705848",
  ["steel"]: "#B8B8D0",
  ["flying"]: "#A890F0",
  ["default"]: "gray",
};
