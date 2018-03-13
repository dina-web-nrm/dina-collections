const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')
module.exports = function createSpecimen({ sequelize }) {
  return createModel({
    name: 'Specimen',
    schemaModelName: 'specimen',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
