const { Dependor } = require('../Dependor')
const createLog = require('../log')
const createOpenApiClient = require('../openApiClient')
const jsonApiGetMany = require('./get/getMany')
const jsonApiGetOne = require('./get/getOne')
const jsonApiCreate = require('./modify/recursiveCreate').recursiveCreate
const jsonApiUpdate = require('./modify/recursiveUpdate').recursiveUpdate
const { setDependencies } = require('./modify/setDependencies')

const log = createLog('common:jsonApiClient')

const dep = new Dependor({
  createOpenApiClient,
  jsonApiCreate,
  jsonApiGetMany,
  jsonApiGetOne,
  jsonApiUpdate,
})

setDependencies()

const createJsonApiClient = ({ apiConfigInput, createEndpoint }) => {
  const openApiClient = dep.createOpenApiClient({
    apiConfigInput,
    createEndpoint,
  })

  const call = (...args) => {
    log.debug('call called forward to openApiClient')
    return openApiClient.call(...args)
  }

  const update = (resourceType, userOptions) => {
    log.debug(`update ${resourceType}`, userOptions)
    const { body = {}, resourcesToModify = [resourceType] } = userOptions
    const item = body.data
    return dep.jsonApiUpdate({
      item,
      openApiClient,
      resourcesToModify,
      resourceType,
    })
  }

  const create = (resourceType, userOptions) => {
    log.debug(`create ${resourceType}`, userOptions)
    const { body = {}, resourcesToModify = [resourceType] } = userOptions
    const item = body.data
    return dep.jsonApiCreate({
      item,
      openApiClient,
      resourcesToModify,
      resourceType,
    })
  }

  const getOne = (resourceType, userOptions) => {
    log.debug(`getOne ${resourceType}`, userOptions)
    return dep.jsonApiGetOne({
      openApiClient,
      resourceType,
      userOptions,
    })
  }

  const getMany = (resourceType, userOptions) => {
    log.debug(`getMany ${resourceType}`, userOptions)
    return dep.jsonApiGetMany({
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

module.exports = {
  createJsonApiClient,
  dep,
}
