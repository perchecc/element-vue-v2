/** @type {import('tailwindcss').Config} */
const isProduction = process.env.NODE_ENV === 'production'
const purge = isProduction ? { enabled: true,
	preserveHtmlElements: false,
	content: ['./index.html', './src/**/*.html', './src/**/*.vue', './src/**/*.jsx'], } : {}
module.exports = {
	// mode: "jit",
	prefix: 'tw-',
	theme: {
		extend: {},
	},
	corePlugins: {}, // 该部分允许您完全禁用 Tailwind 通常默认生成的类（如果您的项目不需要它们）
	plugins: [],
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx}'],
	// 生产环境配置减少未使用的样式类
	purge
};
