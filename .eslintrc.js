module.exports = {
  extends: ['blitz'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js', 'babel.config.js'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    curly: ['error', 'all'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-floating-promises': 'error',
  },
};
