import recommendedConfig from "eslint-config-flat-recommended";

export default recommendedConfig({
  js: true,
  react: true,
  prettier: true,
  globals: ["browser"]
});
