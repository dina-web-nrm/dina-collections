const createModel = require('../../../lib/sequelize/models/factories/documentModel')

exports.agent = function agent({ sequelize }) {
  return createModel({
    name: 'Agent',
    schemaModelName: 'agent',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
