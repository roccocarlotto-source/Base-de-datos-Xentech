const js = require("@eslint/js");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const eslintConfigPrettier = require("eslint-config-prettier");

// Mismo patrón que plataforma-crm-backend: reglas separadas por extensión
// (.ts del backend vs. .js de config), sin eslint-plugin-prettier (el
// formato lo decide Prettier vía `npm run format`, no ESLint), y
// `tseslint.configs.recommended` sin chequeo de tipos para no obligar a
// levantar el programa de TypeScript en cada corrida.

module.exports = tseslint.config(
  {
    ignores: ["node_modules/", "dist/", "coverage/"],
  },

  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      // Convención: un parámetro sin usar (ej. _next en un error handler de
      // Express, que necesita los 4 parámetros por su arity) se prefija con
      // "_" en vez de silenciarlo con un disable comment.
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },

  {
    files: ["**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
  },

  eslintConfigPrettier,
);
