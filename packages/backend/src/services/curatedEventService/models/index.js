const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

exports.expedition = function expedition({ sequelize }) {
  return createModel({
    name: 'Expedition',
    schemaModelName: 'expedition',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
