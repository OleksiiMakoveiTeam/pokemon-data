import { COMPONENT_MAP_TO_ROUTE } from "@/utils/router";
import { Route, Routes } from "react-router";

const ROUTES = Object.entries(COMPONENT_MAP_TO_ROUTE).map(
  ([path, Element]) => ({
    path,
    element: <Element />,
  }),
);

export const RouterProvider = () => {
  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
