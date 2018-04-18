'use strict';

var specimen = {
  collectingInformation: {
    column: 'collectingInformation'
  },
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
  recordHistoryEvent: {
    column: 'recordHistoryEvents'
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