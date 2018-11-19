const createKeyIdMapDecorator = require('../../../../../../../lib/data/transformations/utilities/createKeyIdMapDecorator')

exports.decorateCauseOfDeathTypeKeyIdMap = createKeyIdMapDecorator({
  mapName: 'causeOfDeathTypeKeyIdMap',
  resource: 'causeOfDeathType',
})

exports.decorateCustomTaxonNameTypeKeyIdMap = createKeyIdMapDecorator({
  mapName: 'customTaxonNameTypeKeyIdMap',
  resource: 'customTaxonNameType',
})

exports.decorateEstablishmentMeansTypeKeyIdMap = createKeyIdMapDecorator({
  mapName: 'establishmentMeansTypeKeyIdMap',
  resource: 'establishmentMeansType',
})

exports.decorateFeatureTypeKeyIdMap = createKeyIdMapDecorator({
  mapName: 'featureTypeKeyIdMap',
  resource: 'featureType',
})

exports.decorateIdentifierTypeKeyIdMap = createKeyIdMapDecorator({
  mapName: 'identifierTypeKeyIdMap',
  resource: 'identifierType',
})

exports.decoratePreparationTypeKeyIdMap = createKeyIdMapDecorator({
  mapName: 'preparationTypeKeyIdMap',
  resource: 'preparationType',
})

exports.decorateTypeSpecimenTypeKeyIdMap = createKeyIdMapDecorator({
  mapName: 'typeSpecimenTypeKeyIdMap',
  resource: 'typeSpecimenType',
})

exports.decorateTaxonNameKeyIdMap = require('./decorateTaxonNameKeyIdMap')
exports.decoratePlaceKeyIdMap = require('./decoratePlaceKeyIdMap')
exports.decorateStorageLocationKeyIdMap = require('./decorateStorageLocationKeyIdMap')
