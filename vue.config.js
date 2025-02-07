module.exports = {
  devServer: {
    port: 9000,
    proxy: {  //配置代理服务器,解决跨域请求问题
      "/api": {                                         // 1
        target: 'http://localhost:8080',                  // 2
        changeOrigin: true,                             // 3
        pathRewrite: {
          '^/api': '/'                                  // 4
        }
      }
    }
  }
}