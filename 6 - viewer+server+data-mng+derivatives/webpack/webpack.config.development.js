var clean = require('clean-webpack-plugin')
var html = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {

  context: path.join(__dirname, '..'),

  devtool: 'eval-source-map',

  entry: {

    bundle: [
      'babel-polyfill',
      './src/client/index.js'
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js",
    publicPath: '/'
  },

  plugins: [

    new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/),
    new webpack.optimize.UglifyJsPlugin({minimize: false}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      _ : 'lodash',
      $: 'jquery'
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),

    new html({
      viewer3D: 'https://developer.api.autodesk.com/viewingservice/v1/viewers/viewer3D.js?v=2.13',
      threeJS:  'https://developer.api.autodesk.com/viewingservice/v1/viewers/three.js?v=2.13',
      style:    'https://developer.api.autodesk.com/viewingservice/v1/viewers/style.css?v=2.13',

      template: './layout/index.ejs',
      title: 'Autodesk Forge | DEV',
      filename: 'index.html',
      bundle: 'bundle.js',
      minify: false,
      inject: false
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: [
      path.resolve('./src/client/utils/Viewing.Extensions'),
      path.resolve('./src/client/components'),
      path.resolve('./src/client/services'),
      path.resolve('./src/client/styles'),
      path.resolve('./src/client/utils'),
      path.resolve('./src/client')
    ]
  },

  module: {

    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0']
        }
      },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  }
}