const createModel = require('../../../lib/postgres/models/factories/versionedDocumentModel')

exports.curatedLocality = function curatedLocality({ sequelize }) {
  return createModel({
    name: 'CuratedLocality',
    schemaModelName: 'curatedLocality',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
