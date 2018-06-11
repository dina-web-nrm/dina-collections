'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nestedToCoreSync = require('./nestedToCoreSync');
var denormalizedSpecimen = require('./utilities/testData/denormalizedSpecimen');
var apiFormatPhysicalObject = require('./utilities/testData/apiFormatPhysicalObject');
var nestedPhysicalObjectWithRelationships = require('./utilities/testData/nestedPhysicalObjectWithRelationships');
var normalizedSpecimenWithNewPhysicalObject = require('./utilities/testData/normalizedSpecimenWithNewPhysicalObject');

describe('formatObject/nestedToCoreSync', function () {
  test('is a function', function () {
    expect(typeof nestedToCoreSync === 'undefined' ? 'undefined' : (0, _typeof3.default)(nestedToCoreSync)).toBe('function');
  });

  test('returns non-normalized item with core (api format) keys', function () {
    var testValue = nestedToCoreSync({
      extractRelationships: true,
      item: nestedPhysicalObjectWithRelationships,
      normalize: false,
      type: 'physicalObject'
    });
    var expectedResult = apiFormatPhysicalObject;

    expect(testValue).toEqual(expectedResult);
  });

  test('normalizes and transforms item and returns core (api format) keys', function () {
    var coreItem = nestedToCoreSync({
      extractRelationships: true,
      item: denormalizedSpecimen,
      normalize: true,
      type: 'specimen'
    });
    var coreKeys = (0, _keys2.default)(coreItem).sort();
    expect(coreKeys).toEqual(['attributes', 'id', 'relationships', 'type']);
  });

  test('transforms item and returns core (api format) keys', function () {
    var testValue = nestedToCoreSync({
      extractRelationships: true,
      item: normalizedSpecimenWithNewPhysicalObject,
      normalize: true,
      type: 'specimen'
    });
    var expectedResult = {
      type: 'specimen',
      id: '1234',
      attributes: {
        normalized: {
          individuals: [{
            determinations: [],
            taxonInformation: null,
            featureObservations: [],
            collectionItems: ['69d0e98a-b038-4f4d-9770-cb8c8aaa68a5'],
            identifiers: [],
            collectingInformation: [],
            recordHistoryEvents: [],
            lid: '15413ab7-4c2f-4072-b2ae-3192f2887808'
          }]
        },
        type: 'specimen',
        determinations: [],
        recordHistoryEvents: [],
        taxonInformation: [],
        events: [],
        collectingInformation: [],
        featureObservations: [],
        identifiers: [],
        collectionItems: [{
          physicalObject: {
            lid: 'f2d775a3-ae22-4715-a83e-f2bd736ec2c4'
          },
          lid: '69d0e98a-b038-4f4d-9770-cb8c8aaa68a5'
        }],
        individual: '15413ab7-4c2f-4072-b2ae-3192f2887808'
      }
    };

    expect(testValue).toEqual(expectedResult);
  });

  describe('deeper check of core item format', function () {
    var coreItem = void 0;
    var attributes = void 0;
    var lidRegEx = void 0;
    beforeEach(function () {
      coreItem = nestedToCoreSync({
        extractRelationships: true,
        item: denormalizedSpecimen,
        normalize: true,
        type: 'specimen'
      });

      attributes = coreItem.attributes;
      lidRegEx = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;
    });

    test('regex matches lid', function () {
      var lidRegex = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;
      expect('d64d0630-b630-44aa-ac59-a8f1662c2756').toMatch(lidRegex);
    });

    test('relationships has expected items', function () {
      var _coreItem = coreItem,
          relationships = _coreItem.relationships;

      expect(relationships).toEqual({
        agents: {
          data: [{
            type: 'agent',
            id: '1'
          }]
        },
        featureTypes: {
          data: [{
            type: 'featureType',
            id: '1',
            attributes: {
              type: 'featureType'
            }
          }]
        },
        identifierTypes: {
          data: [{
            type: 'identifierType',
            id: 1
          }]
        },
        physicalObjects: {
          data: [{
            type: 'physicalObject',
            id: '2234',
            attributes: {
              lid: '24bf4bb4-f865-4182-a010-34aa898d845d',
              type: 'physicalObject'
            }
          }]
        },
        places: {
          data: [{
            type: 'place',
            id: '1',
            attributes: {
              type: 'place'
            }
          }, {
            type: 'place',
            id: '2',
            attributes: {
              type: 'place'
            }
          }, {
            type: 'place',
            id: '3',
            attributes: {
              type: 'place'
            }
          }, {
            type: 'place',
            id: '4',
            attributes: {
              type: 'place'
            }
          }, {
            type: 'place',
            id: '5',
            attributes: {
              type: 'place'
            }
          }]
        }
      });
    });

    test('has individual lid and normalized object', function () {
      var expectedFormat = {
        individual: expect.stringMatching(lidRegEx),
        normalized: {}
      };

      expect(attributes).toMatchObject(expectedFormat);
    });

    test('has matching determinations', function () {
      var determinations = attributes.normalized.determinations;

      var expectedFormat = [{
        determinationVerbatim: expect.stringMatching('determinationVerbatim'),
        determinedByAgentText: 'determinedByAgentText',
        remarks: 'remarks',
        taxon: {
          id: '2367',
          type: 'taxon'
        },
        lid: expect.stringMatching(lidRegEx)
      }];

      expect(determinations).toMatchObject(expectedFormat);
    });
    test('has matching collectingInformation', function () {
      var collectingInformation = attributes.normalized.collectingInformation;

      var expectedFormat = [{
        collectorsText: 'collectorsText',
        event: expect.stringMatching(lidRegEx),
        lid: expect.stringMatching(lidRegEx)
      }];

      expect(collectingInformation).toMatchObject(expectedFormat);
    });
    test('has matching collectionItems', function () {
      var collectionItems = attributes.normalized.collectionItems;

      var expectedFormat = [{
        alternateIdentifiersText: 'alternateIdentifiersText',
        physicalObject: {
          id: '2234'
        },
        physicalObjectText: 'physicalObjectText',
        lid: expect.stringMatching(lidRegEx)
      }];

      expect(collectionItems).toMatchObject(expectedFormat);
    });
    test('has matching determinations', function () {
      var determinations = attributes.normalized.determinations;

      var expectedFormat = [{
        determinationVerbatim: expect.stringMatching('determinationVerbatim'),
        determinedByAgentText: 'determinedByAgentText',
        remarks: 'remarks',
        taxon: {
          id: '2367',
          type: 'taxon'
        },
        lid: expect.stringMatching(lidRegEx)
      }];

      expect(determinations).toMatchObject(expectedFormat);
    });
    test('has matching events', function () {
      var events = attributes.normalized.events;

      var expectedFormat = [{
        endDate: 'endDate',
        expeditionText: 'expeditionText',
        locationInformation: {
          coordinatesVerbatim: 'coordinatesVerbatim',
          places: [{
            id: '1'
          }, {
            id: '2'
          }, {
            id: '3'
          }, {
            id: '4'
          }, {
            id: '5'
          }],
          georeferenceSourcesText: 'georeferenceSourcesText',
          localityVerbatim: 'localityVerbatim',
          position: {
            geodeticDatum: 'geodeticDatum text',
            latitude: 'latitude-string',
            longitude: 'longitude-string',
            uncertaintyInMeters: 10
          },
          remarks: 'remarks',
          verticalPosition: {
            maximumDepthInMeters: 100,
            maximumElevationInMeters: 100,
            minimumDepthInMeters: 20,
            minimumElevationInMeters: 20
          }
        },
        lid: expect.stringMatching(lidRegEx)
      }];

      expect(events).toMatchObject(expectedFormat);
    });
    test('has matching featureObservations', function () {
      var featureObservations = attributes.normalized.featureObservations;

      var expectedFormat = [{
        featureObservationAgentText: 'featureObservationAgentText',
        featureObservationText: '21',
        featureType: {
          id: '1'
        },
        methodText: 'methodText',
        lid: expect.stringMatching(lidRegEx)
      }];

      expect(featureObservations).toMatchObject(expectedFormat);
    });
    test('has matching identifiers', function () {
      var identifiers = attributes.normalized.identifiers;

      var expectedFormat = [{
        identifierType: {
          id: 1
        },
        nameSpace: '',
        value: '123456',
        publishRecord: true,
        remarks: '',
        lid: expect.stringMatching(lidRegEx)
      }];

      expect(identifiers).toMatchObject(expectedFormat);
    });
    test('has matching individuals', function () {
      var individuals = attributes.normalized.individuals;

      var expectedFormat = [{
        determinations: expect.arrayContaining([expect.stringMatching(lidRegEx)]),
        recordHistoryEvents: expect.arrayContaining([expect.stringMatching(lidRegEx)]),
        taxonInformation: expect.stringMatching(lidRegEx),
        featureObservations: expect.arrayContaining([expect.stringMatching(lidRegEx)]),
        collectionItems: expect.arrayContaining([expect.stringMatching(lidRegEx)]),
        identifiers: expect.arrayContaining([expect.stringMatching(lidRegEx)]),
        collectingInformation: expect.arrayContaining([expect.stringMatching(lidRegEx)]),
        lid: expect.stringMatching(lidRegEx)
      }];

      expect(individuals).toMatchObject(expectedFormat);
    });
    test('has matching recordHistoryEvents', function () {
      var recordHistoryEvents = attributes.normalized.recordHistoryEvents;

      var expectedFormat = [{
        agent: {
          id: '1'
        },
        date: {
          dateText: '2018'
        },
        lid: expect.stringMatching(lidRegEx)
      }];

      expect(recordHistoryEvents).toMatchObject(expectedFormat);
    });
    test('has matching taxonInformation', function () {
      var taxonInformation = attributes.normalized.taxonInformation;

      var expectedFormat = [{
        lid: expect.stringMatching(lidRegEx)
      }];

      expect(taxonInformation).toMatchObject(expectedFormat);
    });
  });
});