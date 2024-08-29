module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/essential'
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module'
    },
    plugins: [
      'vue'
    ],
    rules: {
      indent: ['error', 2],
      semi: ['error', 'always'],
      'space-before-function-paren': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }]
    }
  };
  