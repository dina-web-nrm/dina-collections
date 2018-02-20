const createModel = require('../../../modelFactories/versionedDocumentModel')

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

exports.identifiableUnitObservationType = function identifiableUnitObservationType({
  sequelize,
}) {
  return createModel({
    name: 'IdentifiableUnitObservationType',
    schemaModelName: 'identifiableUnitObservationType',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
