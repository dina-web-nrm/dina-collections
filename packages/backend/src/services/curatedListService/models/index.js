const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

exports.causeOfDeathType = function causeOfDeathType({ sequelize }) {
  return createModel({
    name: 'CauseOfDeathType',
    schemaModelName: 'causeOfDeathType',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

exports.featureType = function featureType({ sequelize }) {
  return createModel({
    name: 'FeatureType',
    schemaModelName: 'featureType',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

exports.preparationType = function preparationType({ sequelize }) {
  return createModel({
    name: 'PreparationType',
    schemaModelName: 'preparationType',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

exports.loadInitialData = loadInitialData
