//开发环境
const path = require("path");
const Webpack = require("webpack");
const webpackCommonConf = require('./webpack.base.js')
const { merge } = require("webpack-merge");
const { srcPath, distPath } = require("./paths");
console.log()
module.exports = merge(webpackCommonConf, {
  mode: "development",
  cache: {
    type: "filesystem",
  },
  optimization: {
    //开发环境下的优化
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false, // 关闭代码分包
    minimize: false, // 关闭代码压缩
    concatenateModules: false, //关闭模块合并,生产环境可以打开
    usedExports: false, // 关闭 Tree-shaking 功能
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    open: false,
    hot: true, //热更新
    static: {
        directory: path.join(srcPath, "assets"),
    },
    compress: true,  // 启动 gzip 压缩，只能在开发环境下用，生产环境由服务器开启
    proxy: {
      "/api": {
        target: "http://localhost:3000", //代理的目标地址
        pathRewrite: { "^/api": "" }, //如果不希望传递api可以重写
      },
      //可以在这里代理多个地址
    },
    port: 8080,
  },
  plugins: [
    //把process.env.NODE_ENV配置成全局变量，可以在项目中区分生产环境或开发环境
    //比如开发和生产不同的请求地址
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
});
