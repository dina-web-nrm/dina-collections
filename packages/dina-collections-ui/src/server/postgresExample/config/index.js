module.exports = function createConfig() {
  const api = {
    mock: {
      active: true,
      generate: true,
      preferred: false,
    },
    port: 4444,
  }

  const db = {
    database: 'postgres',
    flushOnRestart: false,
    password: 'mysecretpassword',
    username: 'postgres',
  }

  const auth = {
    active: false,
    'auth-server-url': 'https://alpha-keycloak.dina-web.net/auth',
    'bearer-only': true,
    realm: 'dina',
    resource: 'collections',
    'ssl-required': 'none',
    'use-resource-role-mappings': true,
  }

  const log = {
    db: false,
    error: true,
    incomingRequest: false,
    outgoingResponse: true,
  }

  return {
    api,
    auth,
    db,
    log,
  }
}
