const faker = require('json-schema-faker')

faker.option({ alwaysFakeOptionals: true, maxItems: 2 })
module.exports = function importFaker() {
  return Promise.resolve(faker)
}
