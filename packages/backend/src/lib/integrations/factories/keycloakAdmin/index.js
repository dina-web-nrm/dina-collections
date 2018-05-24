const createKeycloakAdminClient = require('keycloak-admin-client')
const createLog = require('../../../../utilities/log')
const { transformUser, transformUsers } = require('./utilities/transformations')

const log = createLog('integrations:keycloakAdmin')

module.exports = function setupKeycloakAdmin({
  baseUrl,
  password,
  realmName,
  username,
}) {
  const settings = {
    baseUrl,
    client_id: 'admin-cli',
    grant_type: 'password',
    password,
    username,
  }

  const getKeycloakAdminClient = () => {
    return createKeycloakAdminClient(settings).then(keycloakAdminClient => {
      return keycloakAdminClient
    })
  }

  return Promise.resolve({
    getUserById(userId) {
      log.debug(`Find user with id: ${userId}`)
      return getKeycloakAdminClient().then(client => {
        return client.users.find(realmName, { userId }).then(user => {
          const cleanedUser = transformUser(user)
          log.debug(`Returning users ${JSON.stringify(cleanedUser, null, 2)}`)
          return cleanedUser
        })
      })
    },
    getUsers() {
      log.debug(`Find users`)
      return getKeycloakAdminClient().then(client => {
        return client.users.find(realmName).then(users => {
          const cleanedUsers = transformUsers(users)
          log.debug(`Returning users ${JSON.stringify(cleanedUsers, null, 2)}`)
          return cleanedUsers
        })
      })
    },
  })
}
