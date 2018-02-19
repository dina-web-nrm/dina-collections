const createEndpointFactory = require('common/src/endpointFactory/createEndpointFactory')

const importFaker = () => import('json-schema-faker')

module.exports = createEndpointFactory({ importFaker })
