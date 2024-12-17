import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint, { parser } from "typescript-eslint";


export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      globals: globals.browser, parser, parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: ['./tsconfig.json'],
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-extra-boolean-cast": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ['error', {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],

      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/member-ordering": [
        "warn",
        {
          "default": [
            "public-field",
            "protected-field",
            "private-field",
            "public-method",
            "protected-method",
            "private-method"
          ]
        }
      ],
      "@typescript-eslint/prefer-readonly": "error",
      "eol-last": [
        "error",
        "always"
      ],
      "no-multiple-empty-lines": "error",
      "object-shorthand": "error",
      "curly": "error",
      "comma-dangle": "off",
      "space-before-blocks": "error",
      "semi": [
        "error",
        "always"
      ],
      "no-console": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "no-case-declarations": "off"
    }
  }
];