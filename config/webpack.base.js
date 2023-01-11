//公共配置文件
const path = require('path')
const { srcPath } = require('./paths')
const HTMLWebpackPlugin = require('html-webpack-plugin')
//vue-loader-16.0.0版本
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
	entry: path.join(srcPath, 'main.ts'),
	experiments: {
		lazyCompilation: true // 代码中通过异步引用语句如 import('./xxx') 导入的模块（以及未被访问到的 entry）都不会被立即编译，而是直到页面正式请求该模块资源（例如切换到该路由）时才开始构建
	},
	optimization: {
		// 值为"single"会创建一个在所有生成chunk之间共享的运行时文件
		runtimeChunk: 'single',
		moduleIds: 'deterministic'
	},
	//用于监控构建产物的体积
	performance: {
		// 设置所有产物体积阈值
		maxAssetSize: 1720 * 1024,
		// 设置 entry 产物体积阈值
		maxEntrypointSize: 1720 * 1024,
		// 报错方式，支持 `error` | `warning` | false
		hints: 'warning',
		// 过滤需要监控的文件类型
		assetFilter: function (assetFilename) {
			return assetFilename.endsWith('.js')
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.(ttf|woff2|otf?)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name].[hash:8][ext]'
				}
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				// type 属性适用于 Webpack5，旧版本可使用 file-loader
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name].[hash:8][ext]'
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								// 添加 autoprefixer 插件
								plugins: [require('autoprefixer')]
							}
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								// 添加 autoprefixer 插件
								plugins: [require('autoprefixer')]
							}
						}
					},
					'less-loader'
				]
			},
			{
				test: /\.(scss|sass)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								// 添加 autoprefixer 插件
								plugins: [require('autoprefixer')]
							}
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.vue$/,
				use: ['vue-loader']
			}
		]
	},
	resolve: {
		// 设置别名
		alias: {
			// __dirname  可以获取被执行 js 文件的绝对路径
			//'@': resolve(__dirname,'src')// 这样引入的写法引入const {resolve } = require('path')
			'@': path.resolve(__dirname, srcPath) // 这样配置后 @ 可以指向 src 目录 只需要@/即可
			//当然，别名写更深层也可以   前提是你得有这个目录啊！！
			//api: resolve("src/api"), // 这样配置后 api 可以指向 src 目录下的api目录
			// 'vue': 'vue/dist/vue.esm.js'
			// process: "process/browser"
		},
		extensions: ['.js', '.jsx', '.json', '.vue', '.ts', '.tsx']
	},
	plugins: [
		new HTMLWebpackPlugin({
			filename: 'index.html',
			template: path.join(srcPath, 'index.html')
		}),
		// vue必须要的依赖
		new VueLoaderPlugin(),
	]
}
