const path = require('path');
const ROOT = path.resolve(__dirname, 'src');

/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: ROOT,

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: ['ng-annotate-loader', 'awesome-typescript-loader']
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '../'
        })
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
          publicPath: '../'
        })
      },

      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },

      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        use: 'file-loader?outputPath=fonts/'
      },

      {
        test: /.htm[l]{0,1}$/,
        exclude: /index.htm$/,
        use: 'html-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'AngularJS - Webpack',
      template: 'index.htm',
      inject: true
    }),
    new ExtractTextPlugin('css/style.css')
  ],

  entry: './index.ts'
};
