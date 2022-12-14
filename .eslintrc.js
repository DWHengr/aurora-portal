/* eslint-disable prettier/prettier */
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
    'import/no-cycle': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'global-require': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'dot-notation': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    'no-mixed-operators': 0,
    'no-return-await': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'no-restricted-globals': 0,
    'no-empty': [
      2,
      {
        allowEmptyCatch: true,
      },
    ],
    camelcase: 0,
    'max-len': [
      1,
      {
        code: 100,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignorePattern: "^(\\s*[a-zA-Z_]+: '[^']+'[,;]*)|(.*require.*)$",
      },
    ],
    'import/prefer-default-export': 0,
    'no-eval': 0,
    'no-plusplus': 0,
    'func-names': 0,
    'consistent-return': 0,
    'class-methods-use-this': 0,
    'no-nested-ternary': 0,
    'no-use-before-define': 0,
    'prefer-destructuring': 0,
    'max-classes-per-file': 0,
    'prefer-promise-reject-errors': 0,

    'vue/script-setup-uses-vars': 'error',
    "no-unused-vars":'off',
    "vue/multi-word-component-names": 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
}
