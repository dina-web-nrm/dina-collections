const createModel = require('../../../lib/sequelize/models/factories/documentModel')

const stageSpecimenFactory = function stageSpecimen({ sequelize }) {
  return createModel({
    name: 'StageSpecimen',
    schemaModelName: 'stageSpecimen',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

const searchSpecimenFactory = function searchSpecimen({ sequelize }) {
  return createModel({
    name: 'SearchSpecimen',
    schemaModelName: 'searchSpecimen',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

module.exports = [
  {
    factory: stageSpecimenFactory,
    name: 'stageSpecimen',
  },
  {
    factory: searchSpecimenFactory,
    name: 'searchSpecimen',
  },
]
