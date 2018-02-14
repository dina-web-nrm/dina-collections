const faker = require('json-schema-faker')

faker.option({ alwaysFakeOptionals: true })
module.exports = function importFaker() {
  return Promise.resolve(faker)
}
