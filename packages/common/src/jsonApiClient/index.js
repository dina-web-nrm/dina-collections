const createLog = require('../log')
const createOpenApiClient = require('../openApiClient')
const jsonApiGetMany = require('./get/getMany')
const jsonApiGetOne = require('./get/getOne')
const jsonApiCreate = require('./modify/recursiveCreate').recursiveCreate
const jsonApiUpdate = require('./modify/recursiveUpdate').recursiveUpdate
const setDependencies = require('./modify/setDependencies').setDependencies

const log = createLog('common:jsonApiClient')

setDependencies()

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
    const { body = {} } = userOptions
    const item = body.data
    return jsonApiUpdate({
      item,
      openApiClient,
      resourceType,
    })
  }

  const create = (resourceType, userOptions) => {
    log.debug(`create ${resourceType}`, userOptions)
    const { body = {} } = userOptions
    const item = body.data
    return jsonApiCreate({
      item,
      openApiClient,
      resourceType,
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
