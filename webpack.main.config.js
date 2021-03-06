'use strict'

const path = require('path')
const pkg = require('./package.json')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
let mainConfig = {
  entry: {
    main: path.join(__dirname, 'app/main/index.js')
  },
  externals: Object.keys(pkg.dependencies || {}),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: (process.env.NODE_ENV === 'production' ? path.join(__dirname, 'dist/app') : path.join(__dirname, 'app')),
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.node'],
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },
  target: 'node-webkit'
}
if (process.env.NODE_ENV === 'production') {
  mainConfig.plugins.push(new CopyWebpackPlugin([
      // {context: './', from: 'Java/FileAnalysis.jar', to: '../Java/FileAnalysis.jar'},
      // {context: './', from: 'file/', to: '../file/'},
      // {context: './', from: 'PackResource/' + process.env.Arch + '/jre/', to: '../jre/'},
      // {
      //   context: './',
      //   from: 'PackResource/' + process.env.Arch + '/node_modules/java/build/',
      //   to: '../node_modules/java/build/'
      // },
      // {context: './', from: 'Config/log4j.properties', to: '../Config/log4j.properties'},
      // {context: './', from: 'Config/mongodbset', to: '../Config/mongodbset'},
      // {context: 'app', from: 'img/logo.png', to: 'logo.png'},
    ], {debug: 'warning'}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new UglifyJsPlugin({
      beautify: false,
      comments: false, // 删除所有的注释
      compress: {
        warnings: false,
        drop_console: true,  // 删除所有的 `console` 语句
        collapse_vars: true,  // 内嵌定义了但是只用到一次的变量
        reduce_vars: true,     // 提取出出现多次但是没有定义成变量去引用的静态值
      },
      minimize: true,
      sourceMap: false
    }))
}
module.exports = mainConfig
