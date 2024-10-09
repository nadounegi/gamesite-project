const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭ESLint
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/',

  configureWebpack: {
    devtool: 'source-map',
  },
  productionSourceMap: true,
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 确保这个端口是后端服务运行的端口
        changeOrigin: true
        // pathRewrite: { '^/api': '' }, // 将/api前缀去掉 这一行不能要
      }
    },
    client: {
      webSocketURL: 'ws://localhost:5050/ws',
      overlay: false
    },
    webSocketServer: false
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        // 添加preserveWhitespace选项
        options.compilerOptions.preserveWhitespace = true;
        return options
      })
  }
})
