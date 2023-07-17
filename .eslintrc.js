module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	parser: 'vue-eslint-parser',
	plugins: ['vue'],
	rules: {
		// 'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		eqeqeq: 'off',
		'no-param-reassign': [
			'error',
			{
				props: true,
				ignorePropertyModificationsFor: [
					'e', // for e.returnvalue
					'req', // for Express requests
					'request', // for Express requests
					'res', // for Express responses
					'response', // for Express responses
					'state', // for vuex state
					'config', // for http index.js
				],
			},
		],
		'no-shadow': [
			'error',
			{
				allow: [
					'state', // for vuex state
				],
			},
		],
		'no-console': 'off',
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				tabWidth: 2,
				printWidth: 100,
			},
		],
	},
	globals: {
		echarts: true,
		$: true,
		'vue-router':true
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [['@', './src']],
			},
		},
	},
};