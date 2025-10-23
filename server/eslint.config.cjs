module.exports = [
    // Ignore patterns
    {
        ignores: ['node_modules/**', 'dist/**', '*.log']
    },

    // Base config for JS/TS files
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module'
        },
        linterOptions: {
            reportUnusedDisableDirectives: true
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
        },
        rules: {
            'no-console': 'off'
        }
    },

    // TypeScript-specific config
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
        },
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
                project: './tsconfig.json',
                tsconfigRootDir: __dirname
            }
        },
        rules: {}
    }
];
