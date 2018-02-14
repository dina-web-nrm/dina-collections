const createEndpointFactory = require('./createEndpointFactory')
const importFaker = require('../jsonSchema/importJsonFakerSync')

module.exports = createEndpointFactory({ importFaker, origin: 'server' })
