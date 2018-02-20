const createModel = require('../../../modelFactories/versionedDocumentModel')

exports.expedition = function expedition({ sequelize }) {
  return createModel({
    name: 'Expedition',
    schemaModelName: 'expedition',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
