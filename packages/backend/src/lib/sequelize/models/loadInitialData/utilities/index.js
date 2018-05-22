exports.extractLoadInitialDataFromServices = services => {
  return Object.keys(services)
    .reduce((modelFactories, serviceName) => {
      const service = services[serviceName]
      const { models } = service
      if (!models) {
        return modelFactories
      }
      let loadInitialDataFactories

      if (Array.isArray(models)) {
        loadInitialDataFactories = models.map(model => {
          const { name, factory } = model
          if (name !== 'loadInitialData') {
            return null
          }
          return {
            loadInitialData: factory,
            serviceName,
          }
        })
      } else {
        loadInitialDataFactories = Object.keys(models).map(name => {
          if (name !== 'loadInitialData') {
            return null
          }
          const loadInitialData = models[name]
          return {
            loadInitialData,
            serviceName,
          }
        })
      }

      return [...modelFactories, ...loadInitialDataFactories]
    }, [])
    .filter(loadInitialData => !!loadInitialData)
}

exports.filterByServiceName = (arr, targetServiceName) => {
  return arr.filter(({ serviceName }) => {
    return serviceName === targetServiceName
  })
}

exports.extractInitialServiceFactories = ({
  factories,
  loadInitialDataServiceOrder,
}) => {
  return loadInitialDataServiceOrder.reduce(
    (initialServiceFactories, serviceName) => {
      const serviceFactories = exports.filterByServiceName(
        factories,
        serviceName
      )

      if (serviceFactories.length) {
        return initialServiceFactories.concat(serviceFactories)
      }

      return initialServiceFactories
    },
    []
  )
}

exports.extractOtherServiceFactories = ({
  factories,
  loadInitialDataServiceOrder,
}) => {
  return factories.reduce((otherServiceFactories, factory) => {
    if (!loadInitialDataServiceOrder.includes(factory.serviceName)) {
      return [...otherServiceFactories, factory]
    }

    return otherServiceFactories
  }, [])
}

exports.orderInitialDataFactories = ({ config, factories }) => {
  const { loadInitialDataServiceOrder } = config.db
  if (!loadInitialDataServiceOrder) {
    return factories
  }

  const initialServiceFactories = exports.extractInitialServiceFactories({
    factories,
    loadInitialDataServiceOrder,
  })
  const otherServiceFactories = exports.extractOtherServiceFactories({
    factories,
    loadInitialDataServiceOrder,
  })

  return [...initialServiceFactories, ...otherServiceFactories]
}
