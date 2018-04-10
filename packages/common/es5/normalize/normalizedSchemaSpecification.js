'use strict';

var specimen = {
  collectionItem: {
    column: 'collectionItems'
  },
  determination: {
    column: 'determinations'
  },
  event: {
    column: 'events'
  },
  featureObservation: {
    column: 'featureObservations'
  },
  identifier: {
    column: 'identifiers'
  },
  individual: {
    column: 'individual'
  },
  individualCircumstance: {
    column: 'individualCircumstances'
  },
  relationships: {
    column: 'relationships',
    normalize: false
  },
  taxonInformation: {
    column: 'taxonInformation'
  }
};

module.exports = {
  specimen: specimen
};