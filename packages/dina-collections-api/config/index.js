const api = {
  mock: {
    active: true,
    generate: true,
    preferred: false,
  },
  port: process.env.API_PORT || 4444,
}

const db = {
  url: process.env.DB_URL || '127.0.0.1:5432',
  database: process.env.DB_DATABASE || 'postgres',
  flushOnRestart: false,
  password: process.env.DB_PASSWORD || 'mysecretpassword',
  username: process.env.DB_USERNAME || 'postgres',
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

module.exports = {
  api,
  auth,
  db,
  log,
}
