const createObjectResponse = require('../../../../../../lib/operationFactories/utilities/transformations/createObjectResponse')
const transformOutput = require('../../../../../../lib/operationFactories/utilities/transformations/outputObject')

module.exports = function getMany({ operation, integrations }) {
  const { resource } = operation
  return ({ request }) => {
    const {
      pathParams: { id },
    } = request

    return integrations.keycloakAdmin.getUserById(id).then(fetchedResource => {
      const output = transformOutput(fetchedResource)
      return createObjectResponse({
        data: output,
        id: output.id,
        type: resource,
      })
    })
  }
}
