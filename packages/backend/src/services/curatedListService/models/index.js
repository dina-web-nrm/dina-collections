const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

exports.featureObservationType = function featureObservationType({
  sequelize,
}) {
  return createModel({
    name: 'FeatureObservationType',
    schemaModelName: 'featureObservationType',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

exports.distinguishedUnitType = function distinguishedUnitType({ sequelize }) {
  return createModel({
    name: 'DistinguishedUnitType',
    schemaModelName: 'distinguishedUnitType',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

exports.loadInitialData = loadInitialData
