const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '..', 'dist', 'public'),
  devServer: {
    https: true,
    host: 'localhost'
  }
};