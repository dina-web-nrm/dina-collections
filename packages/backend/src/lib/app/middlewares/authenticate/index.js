const objectPath = require('object-path')
const createLog = require('../../../../utilities/log')

const log = createLog('authenticateMiddleware')

const createInactiveMiddleware = () => {
  return function inactiveMiddleware(req, res, next) {
    next()
  }
}

const authPreLogMiddleware = (req, res, next) => {
  log.info('Authenticate start')
  next()
}

const authPostLogMiddleware = (req, res, next) => {
  const authTokenContent = objectPath.get(
    req,
    'kauth.grant.access_token.content'
  )
  if (authTokenContent) {
    res.locals.user = {
      email: authTokenContent.email,
      id: authTokenContent.sub,
      name: authTokenContent.name,
    }
  }

  log.info('Authenticate done')
  next()
}

module.exports = function createAuthenticateMiddleware({ auth, config } = {}) {
  if (!config.auth.active) {
    log.info('Auth disabled, creating inactive middleware')
    return createInactiveMiddleware()
  }

  if (!auth) {
    throw new Error('Auth not provided but config.auth.active is true')
  }

  log.info('Auth active, creating keycloak middleware')
  return [authPreLogMiddleware, auth.middleware(), authPostLogMiddleware]
}
