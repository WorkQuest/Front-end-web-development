module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'max-len': 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-async-promise-executor': 'off',
    'no-return-await': 'off',
    'no-unused-vars': 'off',
    'import/no-dynamic-require': 'off',
    'no-restricted-globals': 'off',
    'global-require': 'off',
    'no-undef': 'off',
  },
};
