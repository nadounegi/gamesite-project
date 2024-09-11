const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack'); // 正确导入 webpack

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/',

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        ws: false,
      }
    },
    port: 8080,
    client: {
      webSocketURL: {
        hostname: 'localhost',
        port: 8080,
        protocol: 'ws',
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new NodePolyfillPlugin(),
    ],
    resolve: {
      fallback: {
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "http": require.resolve("stream-http"),
        "url": require.resolve("url"),
        "util": require.resolve("util"),
        "assert": require.resolve("assert"),
        "net": false,  // 禁用 net 模块
        "fs": false,   // 禁用 fs 模块
        "tls": false,  // 禁用 tls 模块
      }
    }
  }
});
