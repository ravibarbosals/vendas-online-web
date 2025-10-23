import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  { ignores: ['dist/'] },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  configPrettier,


  {
    files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'], 
    plugins: {
      'prettier': pluginPrettier,
      'simple-import-sort': pluginSimpleImportSort,
      'react-hooks': pluginReactHooks,
    },
    languageOptions: {
      parser: tseslint.parser, 
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: { 
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect', 
      },
    },
    rules: {
      'prettier/prettier': ['error', { usePrettierrc: true }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
];