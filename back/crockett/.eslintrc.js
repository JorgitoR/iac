module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['prettier', '@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-multi-spaces': ['error'],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				semi: false,
				bracketSameLine: true,
				endOfLine: 'auto',
				useTabs: true,
			},
		],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
	},
}
