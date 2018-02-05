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
    database: 'dina',
    url: 'mongodb://anton:mjau7mjau@ds111078.mlab.com:11078/dina',
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

  const log = {}

  return {
    api,
    auth,
    db,
    log,
  }
}
