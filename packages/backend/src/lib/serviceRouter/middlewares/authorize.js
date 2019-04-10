module.exports = function createAuthorizeMiddleware({ auth, config, log }) {
  if (!config.auth.active) {
    log.info('auth disabled, creating inactive middleware')
    return (req, res, next) => {
      log.info(`${res.locals.id}: specific auth not implemented`)
      next()
    }
  }

  if (!auth) {
    throw new Error('Auth not provided but config.auth.active is true')
  }

  return auth.protect()
}
