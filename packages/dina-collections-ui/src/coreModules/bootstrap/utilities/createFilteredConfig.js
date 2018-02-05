export default function createFilteredConfig(modules, config) {
  return modules.reduce((obj, module) => {
    const moduleName = module.name
    if (config[moduleName]) {
      return {
        ...obj,
        [moduleName]: config[moduleName],
      }
    }
    return obj
  }, {})
}
