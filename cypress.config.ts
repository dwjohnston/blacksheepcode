import { defineConfig } from "cypress";

export default defineConfig({
  retries: 2,
  e2e: {
    baseUrl: "http://localhost:3000",
    // baseUrl: "https://deploy-preview-118--amazing-turing-828569.netlify.app",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
