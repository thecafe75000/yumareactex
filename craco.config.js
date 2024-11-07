const path = require('path')
const CracoLessPlugin = require('craco-less')

module.exports = {
  devServer: {
    open: true,
    host: 'hifromparis.com',
    port: 8090
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
