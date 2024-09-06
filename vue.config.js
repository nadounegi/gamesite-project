const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭ESLint
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/',

  // 配置代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 目标服务器地址
        changeOrigin: true, // 是否允许跨域
        pathRewrite: { '^/api': '' } // 重写路径，移除/api前缀
        ,
        onProxyReq(proxyReq, req, res) {
          console.log('Proxying request:', req.url);

          // 在请求发送之前修改请求头等
          proxyReq.setHeader('X-Special-Proxy-Header', 'foo');
        }
      }
    },
    port:8080,
    client:false
  }
});
