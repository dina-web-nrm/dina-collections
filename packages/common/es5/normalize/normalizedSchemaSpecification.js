'use strict';

var specimen = {
  determination: {
    column: 'determinations'
  },
  distinguishedUnit: {
    column: 'distinguishedUnits'
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
  individualCircumstance: {
    column: 'individualCircumstances'
  },
  individualGroup: {
    column: 'individualGroup'
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