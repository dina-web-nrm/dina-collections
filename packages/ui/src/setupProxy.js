const proxy = require('http-proxy-middleware')

module.exports = function setupProxy(app) {
  app.use(
    proxy('/api', {
      changeOrigin: true,
      target: 'http://127.0.0.1:4444',
      xfwd: true,
    })
  )
  app.use(
    proxy('/auth', {
      changeOrigin: true,
      target: 'http://127.0.0.1:8080',
      xfwd: true,
    })
  )
}
