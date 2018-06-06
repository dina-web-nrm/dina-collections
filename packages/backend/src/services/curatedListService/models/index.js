const loadInitialData = require('./loadInitialData')
const createModel = require('../../../core/models/sequelize/documentModel')

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

exports.establishmentMeansType = function establishmentMeansType({
  sequelize,
}) {
  return createModel({
    name: 'EstablishmentMeansType',
    schemaModelName: 'establishmentMeansType',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

exports.typeSpecimenType = function typeSpecimenType({ sequelize }) {
  return createModel({
    name: 'TypeSpecimenType',
    schemaModelName: 'typeSpecimenType',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

exports.identifierType = function identifierType({ sequelize }) {
  return createModel({
    name: 'IdentifierType',
    schemaModelName: 'identifierType',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

exports.loadInitialData = loadInitialData
