// module.exports = {
//   // ...rest of the Cypress project config
//   projectId: "7ckrzo",

//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// };

import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "7ckrzo",

  e2e: {
    baseUrl: "http://localhost:3000", // Your dev server URL
    setupNodeEvents(on, config) {
      // Add custom configurations if needed
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
