const createArrayResponse = require('../../../../../../lib/controllers/utilities/transformations/createArrayResponse')
const transformOutput = require('../../../../../../lib/controllers/utilities/transformations/outputObject')

module.exports = function getMany({ operation, integrations }) {
  const { resource } = operation
  return () => {
    return integrations.keycloakAdmin.getUsers().then(items => {
      return createArrayResponse({
        items: items.map(item => {
          return transformOutput(item)
        }),
        type: resource,
      })
    })
  }
}
