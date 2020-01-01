const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        page1: './src/index_a.js',
        page2: './src/index_b.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '.',
          name: 'common',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              priority: -10
            }
          }
        },
        runtimeChunk: {
          name: 'runtime'
        }
      },
      plugins: [
        new CleanWebpackPlugin(['dist'], {
          root: process.cwd()
        }),
        new HtmlWebpackPlugin({
          filename: 'index1.html',
          template: './index.html',
          chunks:['page1','runtime','common','vendor']
        }),
        new HtmlWebpackPlugin({
          filename: 'index2.html',
          template: './index.html',
          chunks:['page2','runtime','vendor']
        }),
        new BundleAnalyzerPlugin(),
      ]

}