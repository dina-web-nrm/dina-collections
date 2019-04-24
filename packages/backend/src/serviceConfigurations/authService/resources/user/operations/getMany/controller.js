const createArrayResponse = require('../../../../../../lib/operations/utilities/transformations/createArrayResponse')
const transformOutput = require('../../../../../../lib/operations/utilities/transformations/outputObject')

module.exports = function getMany({ operationSpecification, integrations }) {
  const { resource } = operationSpecification
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
