module.exports = {
  chainWebpack: config => {
    config.module
      .rule('file')
      .test(/\.(png|jpg|gif|pdf)$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  }
}
