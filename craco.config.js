const path = require('path');
const CracoLessPlugin = require("craco-less");


const resolve = (pathname) => path.resolve(__dirname, pathname) 

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],// 配置less
  webpack: {
    alias: { // 配置别名
      '@': resolve('src'),
    }
  }
}