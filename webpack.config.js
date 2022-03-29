const path = require('path');
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const PORT = process.env.PORT && Number(process.env.PORT);
module.exports = function(){
  return {
    mode: process.env.ENV || 'production',
    entry: {
      main: './src/index.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules:[
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets:[
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins:['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
                importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          },'postcss-loader']
        },
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
            }
          }, 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|svg|gif|ico)$/,
          type: 'asset/resource',
          exclude: /node_modules/,
          generator: {
            // [ext]前面自带"."
            filename: 'assets/[hash:8].[name][ext]',
          },
        },
      ]
    },
    resolve:{
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },
    plugins:[
      new htmlWebpackPlugin({
        template: './public/index.html',
        favicon: "./public/favicon.ico",
        filename: "index.html",
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    performance:{
      hints: false,
      maxEntrypointSize: 400000, // 此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示，默认值是：250000 (bytes)。
      maxAssetSize: 100000, // 此选项根据单个资源体积，控制 webpack 何时生成性能提示，默认值是：250000 (bytes)。
      assetFilter: function(assetFilename) { // 只给出 .js 文件的性能提示。
        return assetFilename.endsWith('.js');
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    devtool: "inline-source-map",
    devServer: {
      static:[{
        directory: path.join(__dirname, 'assets'),
      }],
      historyApiFallback: true,
      allowedHosts: ['all'],
      port: PORT,
      client: { overlay: { errors: true, warnings: true } },
      proxy:{}
    },
  }
}