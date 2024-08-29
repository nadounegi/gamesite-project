const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭ESLint
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/',
  devServer: {
    port: 3030,
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 确保这个端口是后端服务运行的端口
        changeOrigin: true,
        // pathRewrite: { '^/api': '' }, // 将/api前缀去掉 这一行不能要
      },
    },
    client:{
      webSocketURL: 'ws://localhost:3030/ws',
      overlay:false,
    },
    webSocketServer:false
  },
});
