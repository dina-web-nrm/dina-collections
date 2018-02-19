const createModel = require('../../../lib/postgres/models/modelFactories/versionedDocumentModel')
const getAllByTaxonNameFactory = require('./modelMethods/getAllByTaxonNameFactory')

module.exports = function createSpecimen({ sequelize }) {
  return createModel({
    customMethodFactories: {
      getAllByTaxonName: getAllByTaxonNameFactory,
    },
    name: 'Specimen',
    schemaModelName: 'specimen',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
