const createModel = require('../../../modelFactories/versionedDocumentModel')

exports.catalogNumber = function catalogNumber({ sequelize }) {
  return createModel({
    name: 'CatalogNumber',
    schemaModelName: 'catalogNumber',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
