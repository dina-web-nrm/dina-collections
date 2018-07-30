const createWrapper = require('../../../wrappers/methods/create')
/* eslint-disable no-underscore-dangle */
const uuidv1 = require('uuid/v4')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/createFactory'
)

module.exports = function createFactory(
  { Model, elasticsearch, forceRefresh } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return createWrapper(({ item }) => {
    const { attributes, relationships, id: providedId, internals = {} } = item

    if (!attributes) {
      return Promise.reject(new Error('attributes not provided'))
    }
    const id = providedId !== undefined ? providedId : uuidv1()

    log.debug(`Creating instance for model ${Model.name}`)
    const newItem = {
      attributes,
      id,
      internals,
      relationships,
    }

    return elasticsearch
      .index({
        body: newItem,
        id,
        index: Model.index,
        refresh: forceRefresh,
        type: Model.name,
      })
      .then(res => {
        log.debug(`Created instance for model ${Model.name}. id: ${res._id}`)
        return {
          item: {
            ...newItem,
            id: res._id,
          },
        }
      })
  })
}
