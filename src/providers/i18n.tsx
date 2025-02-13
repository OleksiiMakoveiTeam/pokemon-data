import { createContext, useMemo } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "@/i18n/locales/en.json";

export const I18nContext = createContext({});

type I18nProviderProps = React.PropsWithChildren<{}>;

// Creating our own I18nProvider component in order to have more control over the i18n instance in one place
// Ideally we would extend it further to support multiple languages
// Will leave as just an example
export const I18nProvider = ({ children }: I18nProviderProps) => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources: { en: { translation } },
      lng: "en",
      debug: false,
    });

  const value = useMemo(() => ({}), []);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
