const createMockGenerator = require('../jsonSchema/createMockGenerator')
const getModelNameFromParameter = require('./getModelNameFromParameter')
const importFaker = require('../jsonSchema/importJsonFakerSync')

module.exports = function createMockFunction({ methodSpecification }) {
  const response =
    methodSpecification &&
    methodSpecification.responses &&
    methodSpecification.responses['200'] &&
    methodSpecification.responses['200'].content &&
    methodSpecification.responses['200'].content['application/vnd.api+json']

  if (!response) {
    return null
  }
  const model = getModelNameFromParameter(response)
  return createMockGenerator({
    importFaker,
    model,
  })
}
