const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.VUE_APP_BASE_URL || '/',

  configureWebpack: {
    devtool: 'source-map'
  },
  productionSourceMap: true,
  devServer: {
    port: 8081, // 前端运行端口
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端服务地址
        changeOrigin: true // 允许跨域
      }
    },
    client: {
      webSocketURL: 'ws://localhost:5050/ws', // WebSocket 配置
      overlay: false
    },
    webSocketServer: false
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
  }
})
