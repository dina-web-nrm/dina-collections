const createEndpointFactory = require('./createEndpointFactory')
const faker = require('json-schema-faker')

const importFaker = () => Promise.resolve(faker)

module.exports = createEndpointFactory({ importFaker })
