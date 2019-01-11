const { Dependor } = require('../Dependor')
const createLog = require('../log')
const createOpenApiClient = require('../openApiClient')
const jsonApiGetMany = require('./get/getMany')
const jsonApiGetOne = require('./get/getOne')
const jsonApiDel = require('./modify/del').del
const jsonApiCreate = require('./modify/recursiveCreate').recursiveCreate
const jsonApiUpdate = require('./modify/recursiveUpdate').recursiveUpdate
const { setDependencies } = require('./modify/setDependencies')

const log = createLog('common:jsonApiClient')

const dep = new Dependor({
  createOpenApiClient,
  jsonApiCreate,
  jsonApiDel,
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
    const {
      body = {},
      relationshipsToModify: relativeRelationshipsToModify = [],
      includesToModify: relativeIncludesToModify = [],
    } = userOptions

    const item = body.data
    const updateTreeLog = log.tree(`update ${resourceType} id: ${item.id}`)
    const relationshipsToModify = !relativeRelationshipsToModify.length
      ? ['all']
      : relativeRelationshipsToModify.map(rel => {
          return `${resourceType}.${rel}`
        })
    const includesToModify = relativeIncludesToModify.map(rel => {
      return `${resourceType}.${rel}`
    })

    return dep
      .jsonApiUpdate({
        includesToModify,
        item,
        log: updateTreeLog,
        openApiClient,
        relationshipsToModify,
        resourceType,
      })
      .then(res => {
        updateTreeLog.print()
        return res
      })
      .catch(err => {
        updateTreeLog.print()
        throw err
      })
  }

  const create = (resourceType, userOptions) => {
    log.debug(`create ${resourceType}`, userOptions)
    const {
      body = {},
      relationshipsToModify: relativeRelationshipsToModify = [],
      includesToModify: relativeIncludesToModify = [],
    } = userOptions
    const item = body.data
    const createTreeLog = log.tree(`create ${resourceType}`)
    const relationshipsToModify = !relativeRelationshipsToModify.length
      ? ['all']
      : relativeRelationshipsToModify.map(rel => {
          return `${resourceType}.${rel}`
        })
    const includesToModify = relativeIncludesToModify.map(rel => {
      return `${resourceType}.${rel}`
    })

    return dep
      .jsonApiCreate({
        includesToModify,
        item,
        log: createTreeLog,
        openApiClient,
        relationshipsToModify,
        resourceType,
      })
      .then(res => {
        createTreeLog.print()
        return res
      })
      .catch(err => {
        createTreeLog.print()
        throw err
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

  const del = (resourceType, userOptions) => {
    log.debug(`del ${resourceType}`, userOptions)
    return dep.jsonApiDel({
      openApiClient,
      resourceType,
      userOptions,
    })
  }

  return {
    ...openApiClient,
    call,
    create,
    del,
    getMany,
    getOne,
    update,
  }
}

module.exports = {
  createJsonApiClient,
  dep,
}
