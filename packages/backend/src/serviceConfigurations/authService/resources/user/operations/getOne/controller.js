const createObjectResponse = require('../../../../../../lib/operations/utilities/transformations/createObjectResponse')
const transformOutput = require('../../../../../../lib/operations/utilities/transformations/outputObject')

module.exports = function getMany({ operationSpecification, integrations }) {
  const { resource } = operationSpecification
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
