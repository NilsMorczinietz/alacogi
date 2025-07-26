/** @type {import('eslint').FlatConfig[]} */
module.exports = [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
                project: './tsconfig.json',
            },
            globals: {
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                process: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            prettier: require('eslint-plugin-prettier'),
        },
        rules: {
            ...require('eslint-plugin-prettier').configs.recommended.rules,
            'prettier/prettier': [
                'error',
                {
                    trailingComma: 'none'
                }
            ],
            ...require('@typescript-eslint/eslint-plugin').configs.recommended.rules,
            ...require('@typescript-eslint/eslint-plugin').configs['recommended-requiring-type-checking'].rules,
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/ban-ts-comment': 'warn',
            'no-console': ['warn', { allow: ['error'] }],
            'eol-last': ['error', 'always'],
            'padding-line-between-statements': [
                'warn',
                { blankLine: 'always', prev: 'import', next: '*' },
                { blankLine: 'any', prev: 'import', next: 'import' },
            ],
        },
        ignores: ['dist/', 'node_modules/'],
    },
];
