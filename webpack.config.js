var path = require('path');

module.exports = {
  entry: [
    __dirname + '/src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    },{
      test: /\.scss/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
    }]
  }
};