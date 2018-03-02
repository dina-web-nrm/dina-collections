const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

exports.curatedLocality = function curatedLocality({ sequelize }) {
  return createModel({
    name: 'CuratedLocality',
    schemaModelName: 'curatedLocality',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
