const { defineConfig } = require('@vue/cli-service');

const isProduction = process.env.NODE_ENV === 'production';

const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir);
}

// bundle分析插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// 自动按需引入elementui插件
const Components = require('unplugin-vue-components/webpack');
const { ElementUiResolver } = require('unplugin-vue-components/resolvers');

// 压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 根据不同环境使用插件配置
const loadPluginsByEnv = () => {
	const plugins = [
		// 自动导入elementui
		Components({
			dts: false, // 是否生成对应的d.ts文件
			resolvers: [
				ElementUiResolver(), // 使用的自动导入插件
			],
		}),
	];

	if (!isProduction) {
		// 开发环境
		// plugins.push(
		// )
	} else {
		// 生产环境
		// bundle分析
		plugins.push(new BundleAnalyzerPlugin());

		// 启用 gzip 压缩插件
		plugins.push(
			new CompressionWebpackPlugin({
				test: /\.js$|\.html$|\.css$/u,
				threshold: 4096, // 超过 4kb 压缩
			}),
		);
	}

	return plugins;
};

const externals = [
	{
		vue: 'Vue',
	},
	{
		'vue-router': 'VueRouter',
	},
	{
		axios: 'axios',
	},
];

const cdn = {
	css: [],
	js: [
		'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
		'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.1/vue-router.min.js',
		'https://cdn.bootcdn.net/ajax/libs/axios/1.3.4/axios.min.js',
	],
};

module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: './',
	outputDir: process.env.VUE_APP_OUTPUTDIR,
	assetsDir: 'static',
	lintOnSave: !isProduction,
	productionSourceMap: !isProduction,
	configureWebpack: () => {
		const resolves = {
			extensions: ['.vue', '.js', '.json', 'scss', 'css'],
			alias: {
				'@': resolve('src'),
				components: resolve('src/components'),
				api: resolve('src/api'),
				utils: resolve('src/utils'),
			},
		};
		const plugins = loadPluginsByEnv();

		return { resolve: resolves, plugins };
	},
	chainWebpack: (config) => {
		config.when(isProduction, (config2) => {
			config2.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial', // only package third parties that are initially dependent
					},
					elementUI: {
						name: 'chunk-elementUI', // split elementUI into a single package
						priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
						test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
					},
					commons: {
						name: 'chunk-commons',
						test: resolve('src/components'), // can customize your rules
						minChunks: 3, //  minimum common number
						priority: 5,
						reuseExistingChunk: true,
					},
				},
			});
			config2.optimization.runtimeChunk('single');
		});

		// config
		//   .plugin("mini-css-extract-plugin")
		//   .use(require("mini-css-extract-plugin"), [
		//     {
		//       filename: "[name].[contenthash].css",
		//       chunkFilename: "[id].[contenthash].css",
		//     },
		//   ])
		//   .end();

		config.externals(externals);
		// 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
		config.plugin('html').tap((args) => {
			const newArgs = [...args];
			newArgs[0].cdn = cdn;
			return newArgs;
		});
	},
	css: {
		extract: true, // 使用 css 分离
		sourceMap: false, // 是否开启 css source-map
		loaderOptions: {
			scss: {
				additionalData: '@import "@/assets/variable.scss";',
			},
		},
	},

	devServer: {
		port: '9090',
		proxy: {
			'^/api/.*': {
				target: process.env.VUE_APP_API_HOST,
				changeOrigin: true,
				secure: false,
				ws: true,
				pathRewrite: {
					'^/api/': '',
				},
			},
		},
	},
});
