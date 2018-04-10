const models = require('common/dist/normalizedModels.json')
const faker = require('json-schema-faker')

faker.option({ alwaysFakeOptionals: true, maxItems: 2 })

const modelsToUse = Object.keys(models).map(moduleKey => {
  return models[moduleKey]
})

module.exports = function createSampleDataGenarator({
  modelName,
  reuseEvery = 10000,
  schema: customSchema,
}) {
  const cache = {}
  const schema = models[modelName] || customSchema

  return function createSampleData(id) {
    const iteration = reuseEvery && id % reuseEvery
    if (reuseEvery && cache[iteration]) {
      return cache[iteration]
    }

    const mockData = faker(schema, modelsToUse)

    if (reuseEvery) {
      cache[iteration] = mockData
    }

    return {
      doc: mockData,
      id: id + 1,
    }
  }
}
