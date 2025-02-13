import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "@/store/slices/pokemon/pokemon";

if (!pokemonApi || !pokemonApi.reducerPath) {
  throw new Error(`pokemonApi is undefined. Check imports. ${pokemonApi}`);
}

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
