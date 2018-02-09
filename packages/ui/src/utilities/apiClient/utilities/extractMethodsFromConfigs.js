module.exports = function extractMethodsFromConfigs(configs, key) {
  return configs.map(config => config[key])
}
