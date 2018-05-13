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
  individuals: {
    column: 'individuals'
  },
  originInformation: {
    column: 'originInformation'
  },
  recordHistoryEvent: {
    column: 'recordHistoryEvents'
  },
  taxonInformation: {
    column: 'taxonInformation'
  },
  relationships: {
    column: 'relationships',
    normalize: false,
    entities: {
      physicalObjects: {
        resourceType: 'physicalObject',
        relationshipType: 'array',
        path: 'individual.collectionItems.*.physicalObject'
      },

      identifierTypes: {
        resourceType: 'identifierType',
        relationshipType: 'array',
        path: 'individual.identifiers.*.identifierType'
      },

      typeSpecimenType: {
        resourceType: 'typeSpecimenType',
        relationshipType: 'object'
      },

      places: {
        resourceType: 'place',
        relationshipType: 'array',
        path: 'individual.collectingInformation.*.event.locationInformation.places',
        column: 'places',
        isExternalRelation: true
      }
    }
  }
};

module.exports = {
  specimen: specimen
};