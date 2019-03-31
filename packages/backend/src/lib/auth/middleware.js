const createUser = require('./createUser')
const objectPath = require('object-path')
const createLog = require('../../utilities/log')

const log = createLog('authenticateMiddleware')

const createInactiveMiddleware = () => {
  return function inactiveMiddleware(req, res, next) {
    next()
  }
}
const createAuthPreLogMiddleware = ({ authActive }) => {
  return function authPreLogMiddleware(req, res, next) {
    log.info('Authenticate start: authActive: ', authActive)
    next()
  }
}

const createAuthPostLogMiddleware = ({ authActive }) => {
  return function authPostLogMiddleware(req, res, next) {
    const token = objectPath.get(req, 'kauth.grant.access_token.content')

    res.locals.user = createUser({
      authActive,
      token,
    })

    log.info('Authenticate done')
    next()
  }
}

module.exports = function createAuthenticateMiddleware({ auth, config } = {}) {
  const authActive = config.auth.active
  if (!authActive) {
    log.info('Auth disabled, creating inactive middleware')
    return [
      createAuthPreLogMiddleware({ authActive }),
      createInactiveMiddleware(),
      createAuthPostLogMiddleware({ authActive }),
    ]
  }

  if (!auth) {
    throw new Error('Auth not provided but config.auth.active is true')
  }

  log.info('Auth active, creating keycloak middleware')
  return [
    createAuthPreLogMiddleware({ authActive }),
    auth.middleware(),
    createAuthPostLogMiddleware({ authActive }),
  ]
}
