module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'quotes': ['warn', 'single'],
    'import/no-unresolved': ['warn'],
    'max-len': [
      'warn',
      {
        code: 160,
        ignoreStrings: true,
      },
    ],
    'camelcase': 0,
    'object-curly-spacing': ['warn', 'always'],
    'no-invalid-this': ['warn'],
    'new-cap': ['warn'],
  },
};
