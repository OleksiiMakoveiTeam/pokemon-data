import { ROUTE_PATHS } from "@/utils/router";
import { useMemo } from "react";
import { useNavigate } from "react-router";

interface BaseRoute {
  name: string;
  route: string;
  link: (...args: any[]) => string;
}

interface Route extends BaseRoute {
  link: <T extends BaseRoute>(...args: Parameters<T["link"]>) => string;
}

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const pokedex = {
    name: "pokedex",
    route: ROUTE_PATHS.POKEDEX,
    link: () => pokedex.route,
    params: () => ({}),
  };

  const singlePokemon = {
    name: "singlePokemon",
    route: ROUTE_PATHS.SINGLE_POKEMON,
    link: ({ id }: { id: string }) =>
      `${ROUTE_PATHS.SINGLE_POKEMON.replace("/:id", "")}/${id}`,
  };

  const names = useMemo(
    () =>
      ({
        pokedex,
        singlePokemon,
      } as const),
    [],
  );

  const routes = useMemo(
    () =>
      ({
        [pokedex.route]: pokedex,
        [singlePokemon.route]: singlePokemon,
      } as const),
    [],
  );

  const pathname = location.pathname as keyof typeof routes;
  const route = routes[pathname] as Route;

  const current = {
    route,
    pathname,
  };

  return {
    names,
    current,
    navigate,
  };
};
