// import all namespaces (for the default language, only)
import { resources } from "./resources";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    // custom resources type
    resources: typeof resources;
  }
}
