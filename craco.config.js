const path = require('path')
const CracoLessPlugin = require('craco-less')

module.exports = {
  devServer: {
    open: true,
    host: 'hifromparis.com',
    port: 8090,
    // 使用代理解决跨域问题
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9292',
        changeOrigin: true,
        pathRewrite: {
          '^/api':''
        }
      }
    }
  },
  webpack: {
    // 路径别名
    // 同时也需要在tsconfig.json文件里配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // 配置less插件
  plugins: [{ plugin: CracoLessPlugin }]
}
