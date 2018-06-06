const loadInitialData = require('./loadInitialData')
const createModel = require('../../../core/models/sequelize/documentModel')
const createSetupRelations = require('../../../lib/services/relations/createSetupRelations')

const taxonFactory = function taxon({ sequelize }) {
  return createModel({
    name: 'Taxon',
    schemaModelName: 'taxon',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

const taxonNameFactory = function taxonName({ sequelize }) {
  return createModel({
    name: 'TaxonName',
    schemaModelName: 'taxonName',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

module.exports = [
  {
    factory: taxonFactory,
    name: 'taxon',
  },
  {
    factory: taxonNameFactory,
    name: 'taxonName',
  },
  {
    factory: createSetupRelations(['taxon', 'taxonName']),
    name: 'setupRelations',
  },
  {
    factory: loadInitialData,
    name: 'loadInitialData',
  },
]
