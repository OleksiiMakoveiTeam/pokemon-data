import { PokedexPage } from "@/pages/pokedex/pokedex";
import { SinglePokemonPage } from "@/pages/single-pokemon/single-pokemon";
import { Route, Routes } from "react-router";

const ROUTES = [
  {
    path: "/pokedex",
    element: <PokedexPage />,
  },
  {
    path: "/single-pokemon/:id",
    element: <SinglePokemonPage />,
  },
];
export const RouterProvider = () => {
  // const router = useNavigate();

  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
