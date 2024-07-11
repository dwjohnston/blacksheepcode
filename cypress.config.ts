import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://deploy-preview-118--amazing-turing-828569.netlify.app",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
