const createEndpointFactory = require('./createEndpointFactory')

const importFaker = () => import('json-schema-faker')

module.exports = createEndpointFactory({ importFaker })
