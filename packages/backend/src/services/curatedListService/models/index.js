const createModel = require('../../../lib/postgres/models/factories/versionedDocumentModel')

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

exports.distinguishedUnitObservationType = function distinguishedUnitObservationType({
  sequelize,
}) {
  return createModel({
    name: 'DistinguishedUnitObservationType',
    schemaModelName: 'distinguishedUnitObservationType',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
