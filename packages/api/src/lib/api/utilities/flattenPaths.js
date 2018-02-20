module.exports = function flattenPaths(paths) {
  return Object.keys(paths).reduce((flatPaths, pathname) => {
    const pathSpecification = paths[pathname]
    const methods = Object.keys(pathSpecification)
    return [
      ...flatPaths,
      ...methods.map(method => {
        const methodSpecification = pathSpecification[method]
        return {
          method,
          methodSpecification,
          operationId: methodSpecification.operationId,
          // TODO fix this hack
          pathname: pathname.replace('{id}', ':id'),
        }
      }),
    ]
  }, [])
}
