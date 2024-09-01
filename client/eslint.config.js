import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

const typescriptPlugin = {
  rules: {
    // Add rules from "@typescript-eslint/recommended" here
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    // ... other rules
  }
};

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Add any specific rules or overrides here
      ...typescriptPlugin.rules,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    ignores: ["vite.config.ts", "jest.config.ts"], // Exclude specific files 
  },
];
