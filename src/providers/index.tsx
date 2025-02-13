import { BrowserRouter } from "react-router";
import { I18nProvider } from "./i18n";
import { RouterProvider } from "./router";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import { setupStore } from "@/store/store";
import { Provider } from "react-redux";
import { NavLayout } from "@/layouts/nav-layout";

const store = setupStore();

export const Providers = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <I18nProvider>
            <NavLayout>
              <RouterProvider />
            </NavLayout>
          </I18nProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};
