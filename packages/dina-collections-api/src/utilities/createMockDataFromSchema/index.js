const faker = require('json-schema-faker')

export default function createMockDataFromSchema(schema) {
  return Promise.resolve(faker(schema))
}
