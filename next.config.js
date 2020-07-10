const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  env: {
    API: 'http://192.168.1.5:8000'
  }
})