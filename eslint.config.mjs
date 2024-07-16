import globals from "globals";
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import vitestGlobals from "eslint-plugin-vitest-globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["node_modules", "dist"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest,
      },
      parser: tsParser,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      'vitest-globals': vitestGlobals
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'vitest-globals/all': 'error'
    }
  },
]
