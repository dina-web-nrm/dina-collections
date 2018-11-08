const { createSelector } = require('reselect')

const getOpenApiSpec = openApiSpec => openApiSpec

const buildOperationIdPathnameMap = createSelector(
  getOpenApiSpec,
  openApiSpec => {
    const map = {}
    Object.keys(openApiSpec.paths).forEach(pathname => {
      const methods = openApiSpec.paths[pathname]
      Object.keys(methods).forEach(methodName => {
        const methodSpecification = methods[methodName]
        if (methodSpecification.operationId)
          map[methodSpecification.operationId] = {
            methodName,
            methodSpecification,
            pathname,
          }
      })
    })

    return map
  }
)

module.exports = createSelector(
  buildOperationIdPathnameMap,
  (_, operationId) => operationId,

  (map, operationId) => {
    if (!map) {
      throw new Error('missing openApiSpec')
    }
    if (!operationId) {
      throw new Error('missing operationId')
    }

    return map[operationId]
  }
)
