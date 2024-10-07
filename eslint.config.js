import recommendedConfig from "eslint-config-flat-recommended";
import globals from "globals";

export default [
  ...recommendedConfig({
    js: true,
    ts: true,
    react: true,
    prettier: true,
    stylistic: false
  }),
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
];
