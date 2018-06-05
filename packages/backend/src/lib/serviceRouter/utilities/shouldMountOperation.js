module.exports = function shouldMountOperation({
  config,
  operationId,
  serviceName,
}) {
  const serviceConfig =
    config && config.services && config.services[serviceName]

  if (!serviceConfig) {
    return false
  }

  const exclude =
    serviceConfig &&
    serviceConfig.operations &&
    serviceConfig.operations.exclude
  if (exclude && exclude.includes(operationId)) {
    return false
  }

  const include =
    serviceConfig &&
    serviceConfig.operations &&
    serviceConfig.operations.include

  if (include) {
    if (include && include.includes(operationId)) {
      return true
    }
    return false
  }

  return true
}
