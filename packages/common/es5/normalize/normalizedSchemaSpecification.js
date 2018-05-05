'use strict';

var specimen = {
  collectingInformation: {
    column: 'collectingInformation'
  },
  collectionItem: {
    column: 'collectionItems'
  },

  deathInformation: {
    column: 'deathInformation'
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
  originInformation: {
    column: 'originInformation'
  },
  physicalObject: {
    column: 'physicalObjects'
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