// functionTypes one of [modelFactory, setupRelations, loadInitialData]

const excludeFunction = ({ functionType, name }) => {
  if (
    functionType === 'modelFactory' &&
    (name === 'setupRelations' || name === 'loadInitialData')
  ) {
    return true
  }

  if (functionType !== 'modelFactory' && name !== functionType) {
    return true
  }
  return false
}

module.exports = function extractModelFunctionsFromServices({
  services,
  functionType,
}) {
  return Object.keys(services)
    .reduce((modelFunctions, serviceName) => {
      const service = services[serviceName]
      const { models } = service
      if (!models) {
        return modelFunctions
      }
      let endpointModelFunctions

      if (Array.isArray(models)) {
        endpointModelFunctions = models.map(model => {
          const { name, factory } = model
          if (excludeFunction({ functionType, name })) {
            return {}
          }

          return {
            modelFunction: factory,
            name,
          }
        })
      } else {
        endpointModelFunctions = Object.keys(models).map(name => {
          if (excludeFunction({ functionType, name })) {
            return {}
          }
          return {
            modelFunction: models[name],
            name,
          }
        })
      }

      return [...modelFunctions, ...endpointModelFunctions]
    }, [])
    .filter(({ modelFunction }) => !!modelFunction)
}
