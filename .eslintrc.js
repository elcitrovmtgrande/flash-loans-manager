module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'operator-assignment': 0,
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    'no-unused-vars': 1,
    'no-restricted-syntax': 0,
  },
};
