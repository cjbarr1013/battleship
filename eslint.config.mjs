import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
  {
    ignores: ['node_modules/*', 'dist/*'],
  },
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
