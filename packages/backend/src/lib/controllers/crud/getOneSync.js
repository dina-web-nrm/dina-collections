const transformOutput = require('../utilities/transformations/outputObject')
const createObjectResponse = require('../utilities/transformations/createObjectResponse')

module.exports = function getOneSync({ operation, models }) {
  const { resource } = operation

  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    const { pathParams: { id } } = request

    const fetchedResource = model.getByIdSync({ id })
    if (!fetchedResource) {
      return null
    }

    const output = transformOutput(fetchedResource)
    return createObjectResponse({
      data: output,
      id: output.id,
      type: resource,
    })
  }
}
