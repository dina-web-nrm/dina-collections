const specimen = {
  determination: {
    column: 'determinations',
  },
  collectionItem: {
    column: 'collectionItems',
  },
  event: {
    column: 'events',
  },
  featureObservation: {
    column: 'featureObservations',
  },
  identifier: {
    column: 'identifiers',
  },
  individualCircumstance: {
    column: 'individualCircumstances',
  },
  individual: {
    column: 'individual',
  },
  relationships: {
    column: 'relationships',
    normalize: false,
  },
  taxonInformation: {
    column: 'taxonInformation',
  },
}

module.exports = {
  specimen,
}
