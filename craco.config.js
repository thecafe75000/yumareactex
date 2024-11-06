const path = require('path')

module.exports = {
  devServer: {
    open: true,
    host: 'hifromparis.com',
    port: 8090
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
