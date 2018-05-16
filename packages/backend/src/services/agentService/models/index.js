const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/documentModel')

const agentFactory = function agent({ sequelize }) {
  return createModel({
    name: 'Agent',
    schemaModelName: 'agent',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

module.exports = [
  {
    factory: agentFactory,
    name: 'agent',
  },
  {
    factory: loadInitialData,
    name: 'loadInitialData',
  },
]
