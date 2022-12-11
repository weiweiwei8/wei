module.exports={
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "static",
  // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  lintOnSave:false,
  // 我用的only，打包后小些
  runtimeCompiler: false,
  productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  devServer: {
    open: false,
    // 设置主机地址
    host: 'localhost',
    // 设置默认端口
    port: 7000,
    https: false,
    hotOnly: false,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://localhost:3000',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}