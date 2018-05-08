const createLog = require('../log')
const createOpenApiClient = require('../openApiClient')
const jsonApiGetMany = require('./get/getMany')
const jsonApiGetOne = require('./get/getOne')
const jsonApiCreate = require('./create/create').create
const jsonApiUpdate = require('./create/update')

const log = createLog('common:jsonApiClient')

module.exports = function createJsonApiClient({
  apiConfigInput,
  createEndpoint,
}) {
  const openApiClient = createOpenApiClient({
    apiConfigInput,
    createEndpoint,
  })

  const call = (...args) => {
    log.debug('call called forward to openApiClient')
    return openApiClient.call(...args)
  }

  const update = (resourceType, userOptions) => {
    log.debug(`update ${resourceType}`, userOptions)
    return jsonApiUpdate({
      openApiClient,
      resourceType,
      userOptions,
    })
  }

  const create = (resourceType, userOptions) => {
    log.debug(`create ${resourceType}`, userOptions)
    return jsonApiCreate({
      openApiClient,
      resourceType,
      userOptions,
    })
  }

  const getOne = (resourceType, userOptions) => {
    log.debug(`getOne ${resourceType}`, userOptions)
    return jsonApiGetOne({
      openApiClient,
      resourceType,
      userOptions,
    })
  }

  const getMany = (resourceType, userOptions) => {
    log.debug(`getMany ${resourceType}`, userOptions)
    return jsonApiGetMany({
      openApiClient,
      resourceType,
      userOptions,
    })
  }

  return {
    call,
    create,
    getMany,
    getOne,
    update,
  }
}
