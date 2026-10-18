import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://chilimango.pl",
  output: "static",
  trailingSlash: "never",
  i18n: {
    locales: ["pl", "en"],
    defaultLocale: "pl",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
