const { defineConfig, globalIgnores } = require('eslint/config')

const tsParser = require('@typescript-eslint/parser')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const chaiFriendly = require('eslint-plugin-chai-friendly')
const jest = require('eslint-plugin-jest')
const _import = require('eslint-plugin-import')
const prettier = require('eslint-plugin-prettier')

const { fixupPluginRules, fixupConfigRules } = require('@eslint/compat')

const globals = require('globals')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
      },

      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key]) => [key, 'off'])
        ),
        ...globals.node,
        JSX: true,
        AriaAttributes: true,
        process: true,
      },
    },

    settings: {
      version: 'detect',
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      'chai-friendly': chaiFriendly,
      jest,
      import: fixupPluginRules(_import),
      prettier,
    },

    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:unicorn/recommended',
        'xo/browser',
        'xo-typescript/space',
        'xo-react/space',
        'plugin:jest/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier'
      )
    ),
  },
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],

    rules: {
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],

      'no-undef': 2,
      'no-console': 'error',
      'capitalized-comments': 0,
      'func-style': ['error', 'declaration'],
      'no-constant-binary-expression': 0,
      'import/no-unresolved': 'error',
      'import/no-relative-parent-imports': 'error',
      'import/newline-after-import': 'error',
      'import/no-anonymous-default-export': 'error',

      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase',
        },
      ],

      'unicorn/prefer-optional-catch-binding': 0,
      'unicorn/consistent-destructuring': 0,
      'unicorn/prefer-node-protocol': 0,
      'unicorn/import-style': 0,
      'unicorn/prefer-array-flat': 0,
      'unicorn/no-array-for-each': 0,
      'unicorn/prevent-abbreviations': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': 'error',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
        },
      ],
    },
  },
  {
    files: ['tests/**/*test.ts'],

    rules: {
      '@typescript-eslint/no-require-imports': 0,
      'unicorn/prefer-module': 0,
      'jest/no-conditional-expect': 0,
    },
  },
  {
    files: ['types/tests/**/*.ts', 'types/tests/**/*.tsx'],

    rules: {
      'import/no-unassigned-import': 0,
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/no-unsafe-call': 0,
    },
  },
  {
    files: ['**/types/**/*.ts'],

    rules: {
      'import/no-relative-parent-imports': 0,
      'unicorn/prefer-export-from': 0,
    },
  },
  globalIgnores([
    'tests/plugin.test.js',
    'tests/stitches.config.js',
    'tests/__fixtures__',
    'types/macro.d.ts',
    'types',
    '.eslintrc.js',
    'macro.js',
    'sandbox',
    'jest.config.ts',
  ]),
])
