export default function createEnhancers(modules, config = {}) {
  return modules
    .map(module => {
      const enhancerFactory = module.enhancer
      if (!enhancerFactory) {
        return null
      }
      const { name } = module
      const moduleConfig = config[name]
      const moduleEnhancerConfig = moduleConfig && moduleConfig.enhancer
      return enhancerFactory(moduleEnhancerConfig)
    })
    .filter(enhancer => !!enhancer)
}
