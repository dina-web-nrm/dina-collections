module.exports = function readApis(services) {
  return Object.keys(services).reduce((obj, serviceName) => {
    const { description, name } = services[serviceName].info || {}

    return {
      ...obj,
      [serviceName]: {
        description,
        name,
      },
    }
  }, {})
}
