let models = {}
let normalizedModels = {}
let openApiSpec = {}
let modelInfo = {}
let apiInfo = {}
let initialized = false

exports.set = ({
  apiInfo: apiInfoInput,
  modelInfo: modelInfoInput,
  openApiSpec: openApiSpecInput,
  models: modelsInput,
  normalizedModels: normalizedModelsInput,
}) => {
  if (!apiInfo) {
    throw new Error('api info required')
  }

  if (!modelInfo) {
    throw new Error('modelInfo info required')
  }

  if (!models) {
    throw new Error('models required')
  }

  if (!normalizedModels) {
    throw new Error('models required')
  }

  if (!openApiSpec) {
    throw new Error('openApiSpec required')
  }

  models = modelsInput
  normalizedModels = normalizedModelsInput
  openApiSpec = openApiSpecInput
  apiInfo = apiInfoInput
  modelInfo = modelInfoInput
  initialized = true
}

const ensureInitialized = () => {
  if (!initialized) {
    throw new Error('Schema interface not initialized')
  }
}

exports.getModels = () => {
  ensureInitialized()
  return models
}

exports.getNormalizedModels = () => {
  ensureInitialized()
  return normalizedModels
}

exports.getOpenApiSpec = () => {
  ensureInitialized()
  return openApiSpec
}

exports.getModelInfo = () => {
  ensureInitialized()
  return modelInfo
}

exports.getApiInfo = () => {
  ensureInitialized()
  return apiInfo
}
