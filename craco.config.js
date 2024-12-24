const path = require('path')
const CracoLessPlugin = require('craco-less')

module.exports = {
  devServer: {
    open: true,
    host: 'hifromparis.com',
    // host: 'localhost',
    port: 8090,
    // 关掉前端页面的报错弹窗
    client: {
      overlay: false
    },
    // 使用代理解决跨域问题
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9292',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  webpack: {
    // 路径别名
    // 同时也需要在tsconfig.json文件里配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    configure: (webpackConfig, { env }) => {
      // 确保我们只在开发模式下更改 devtool 设置
      if (env === 'development') {
        webpackConfig.devtool = 'source-map'
      }
      return webpackConfig
    }
  },
  // 配置less插件
  plugins: [{ plugin: CracoLessPlugin }]
}
