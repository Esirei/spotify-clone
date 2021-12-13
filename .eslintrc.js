module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  parserOptions: {
    sourceType: 'module',
  },

  plugins: ['react', 'react-hooks', 'jsx-a11y'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Prettier should be last
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'react/react-in-jsx-scope': 0, // NextJS does not require React import
    'react-hooks/exhaustive-deps': 2,
    'jsx-a11y/anchor-is-valid': 0, // This rule is not compatible with NextJS's <Link/> components
  },

  overrides: [
    {
      files: ['*.{ts,tsx}'],

      parser: '@typescript-eslint/parser',

      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },

      plugins: ['@typescript-eslint'],

      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      rules: {
        'react/prop-types': 0,
        '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
        'no-unused-vars': 0,
      },
    },
  ],
};
