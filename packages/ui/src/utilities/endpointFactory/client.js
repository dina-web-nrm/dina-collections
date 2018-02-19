const createEndpointFactory = require('common/es5/endpointFactory/createEndpointFactory')

const importFaker = () => import('json-schema-faker')

module.exports = createEndpointFactory({ importFaker })
