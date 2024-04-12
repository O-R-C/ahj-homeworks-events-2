// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV == 'production'

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          stylesHandler,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: '[local]--[hash:base64:5]',
                namedExport: false,
                exportLocalsConvention: 'as-is',
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      })
    )
  } else {
    config.mode = 'development'
    config.devtool = 'source-map'
  }
  return config
}
