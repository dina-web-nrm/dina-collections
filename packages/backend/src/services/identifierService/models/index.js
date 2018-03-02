const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

exports.catalogNumber = function catalogNumber({ sequelize }) {
  return createModel({
    name: 'CatalogNumber',
    schemaModelName: 'catalogNumber',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
