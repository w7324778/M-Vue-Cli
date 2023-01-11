//生产环境
const path = require('path')
const { srcPath, distPath } = require('./paths')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.base.js')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = merge(webpackCommonConf, {
	output: {
		filename: 'bundle.[contenthash:8].js', // 打包代码时，加上 hash 戳
		path: distPath,
		//通过./打包后的静态文件指向当前文件，部署到服务器上的时候一般都是在一个文件下。
		publicPath: './' // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
	},
	mode: 'production',
	module: {
		relus: [
			//css处理
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					,
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
			//sass处理
			{
				test: /\.(scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					,
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
			//less处理
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					,
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
			}
		]
	},
	optimization: {
		// 压缩 css
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						pure_funcs: ['console.log']
					}
				}
			}),
			new CssMinimizerPlugin()
		],
		// 分割代码块
		splitChunks: {
			chunks: 'all',
			/**
         * initial 入口chunk，对于异步导入的文件不处理
            async 异步chunk，只对异步导入的文件处理
            all 全部chunk
         */

			// 缓存分组
			cacheGroups: {
				// 第三方模块
				vendor: {
					name: 'vendor', // chunk 名称
					priority: 1, // 权限更高，优先抽离，重要！！！
					test: /node_modules/,
					minSize: 0, // 大小限制
					minChunks: 1 // 最少复用过几次
				},

				// 公共的模块
				common: {
					name: 'common', // chunk 名称
					priority: 0, // 优先级
					minSize: 0, // 公共模块的大小限制
					minChunks: 2 // 公共模块最少复用过几次
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				// type 属性适用于 Webpack5，旧版本可使用 file-loader
				type: 'asset/resource',
				generator: {
					//使用has命名 配合缓存
					filename: 'img/[name]_[hash:6][ext]'
				},
				use: [
					{
						loader: 'image-webpack-loader', //压缩图片
						options: {
							disable: true, //图像压缩是一种非常耗时的操作，建议只在生产环境下开启
							mozjpeg: {
								progressive: true,
								quality: 60 // JPG 输出的质量 一般60为可接受的
							},
							optipng: {
								enabled: true
							},
							pngquant: {
								quality: [0.5, 0.65], // PNG 质量范围
								speed: 4
							},
							gifsicle: {
								interlaced: false // 优化GIF
							},
							webp: {
								quality: 75 // 转换为 webp
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			filename: 'index.html',
			template: path.join(srcPath, 'index.html')
			// minify: {
			//   collapseWhitespace: true, // 去掉空格
			//   removeComments: true // 去掉注释
			// },
			//chunks 表示该页面要引用哪些 chunk,默认全部引用
			//chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
		}),
		new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' }),
		new CleanWebpackPlugin(), // 会默认清空dist
		//把process.env.NODE_ENV配置成全局变量，可以在项目中区分生产环境或开发环境
		//比如开发和生产不同的请求地址
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
})
