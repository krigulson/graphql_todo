module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['airbnb-base', 'plugin:vue/base'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    'no-shadow': ['error', { allow: ['state'] }],
    'import/extensions': 'off',
    'import/no-unresolved': [0, { caseSensitive: false }],
    'max-len': ['error', { code: 500 }],
  },
  settings: {
    'import/core-modules': ['vue', 'vuex', 'axios'],
  },
};
