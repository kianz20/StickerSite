import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import parser from '@typescript-eslint/parser';


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: {
    parser: parser,
    parserOptions: {
      parser: '@typescript-eslint/parser',
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  
];