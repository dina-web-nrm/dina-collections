const createOpenApiClient = require('../openApiClient')
const jsonApiGetMany = require('./get/getMany')
const jsonApiGetOne = require('./get/getOne')

module.exports = function createJsonApiClient({
  apiConfigInput,
  createEndpoint,
}) {
  const openApiClient = createOpenApiClient({
    apiConfigInput,
    createEndpoint,
  })

  const call = (...args) => {
    return openApiClient.call(...args)
  }

  const getOneOfResourceType = (resourceType, userOptions) => {
    return jsonApiGetOne({
      openApiClient,
      resourceType,
      userOptions,
    })
  }

  const getManyOfResourceType = (resourceType, userOptions) => {
    return jsonApiGetMany({
      openApiClient,
      resourceType,
      userOptions,
    })
  }

  return {
    call,
    getManyOfResourceType,
    getOneOfResourceType,
  }
}
