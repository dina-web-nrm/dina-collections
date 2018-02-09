export default function createMiddlewareArray({ middlewareMap, moduleOrder }) {
  return moduleOrder
    .map(moduleName => {
      return middlewareMap[moduleName]
    })
    .filter(middleware => !!middleware)
}
