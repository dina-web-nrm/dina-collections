const createModel = require('../../../../lib/postgres/models/createModel')
const getAllByTaxonNameFactory = require('./modelMethods/getAllByTaxonNameFactory')

module.exports = function createIndividualGroup({ sequelize }) {
  return createModel({
    customMethodFactories: {
      getAllByTaxonName: getAllByTaxonNameFactory,
    },
    name: 'IndividualGroup',
    schemaModelName: 'individualGroup',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
