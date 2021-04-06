const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== "production";

module.exports = {

  entry: './FrontEnd/app.js',
  output: {
    path: path.join(__dirname, 'BackEnd/public'),
    filename: 'js/bundle.js'
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          devMode ? 'style-loader': MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './FrontEnd/index.html',

      //minify code  
      minify: {
        //remove blanks
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true

      },

    }),
    new MiniCssExtractPlugin({
      filename: "css/bundle.css"
    })
  ],

  devtool: 'source-map'

}