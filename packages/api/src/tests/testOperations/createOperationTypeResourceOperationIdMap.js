const testOperationTypesMap = {
  create: true,
  getMany: true,
  getOne: true,
  update: true,
}

module.exports = function createOperationTypeResourceOperationIdMap(api) {
  return Object.keys(api.endpoints).reduce((map, operationId) => {
    const { operationType, resource } = api.endpoints[operationId]
    if (!operationType) {
      return map
    }

    if (!testOperationTypesMap[operationType]) {
      return map
    }

    /* eslint-disable no-param-reassign */
    if (!map[resource]) {
      map[resource] = {}
    }

    if (map[resource][operationType]) {
      throw new Error(
        `operationType colliding ${operationType} for ${operationId}`
      )
    }

    map[resource] = {
      ...map[resource],
      [operationType]: operationId,
    }
    /* eslint-enable no-param-reassign */

    return map
  }, {})
}
