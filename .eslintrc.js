module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'react-app',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react', 'prettier', 'import'],
	rules: {
		'no-console': 'warn',
		'no-unused-vars': 'warn',
		'import/no-anonymous-default-export': [
			2,
			{
				allowObject: true,
			},
		],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_',
				argsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'interface',
				format: ['PascalCase'],
				custom: {
					regex: '^I[A-Z]',
					match: true,
				},
			},
		],
		'no-useless-rename': 'error',
		'object-shorthand': 'error',
		'react/jsx-key': ['error', { checkFragmentShorthand: true }],
	},
};
