const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/documentModel')
const createSetupRelations = require('../../../lib/services/relations/createSetupRelations')

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
    factory: createSetupRelations(['agent']),
    name: 'setupRelations',
  },
  {
    factory: loadInitialData,
    name: 'loadInitialData',
  },
]
