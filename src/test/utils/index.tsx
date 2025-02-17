import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import React, { JSX, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { AppStore, setupStore } from "@/store/store";
import { NavLayout } from "@/layouts/nav-layout";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  store?: AppStore;
}
// Ideally all the providers which are used would be utilized here, but i'm afraid of the time
// It can take to resolve all of it.
function renderWithProviders(
  ui: React.ReactElement,
  { store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <NavLayout>{children}</NavLayout>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { renderWithProviders };
