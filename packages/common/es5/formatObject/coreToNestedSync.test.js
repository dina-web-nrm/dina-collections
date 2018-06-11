'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coreToNestedSync = require('./coreToNestedSync');
var apiFormatPhysicalObject = require('./utilities/testData/apiFormatPhysicalObject');
var apiFormatSpecimen = require('./utilities/testData/apiFormatSpecimen');
var nestedPhysicalObjectWithRelationships = require('./utilities/testData/nestedPhysicalObjectWithRelationships');

describe('formatObject/coreToNestedSync', function () {
  it('is a function', function () {
    expect(typeof coreToNestedSync === 'undefined' ? 'undefined' : (0, _typeof3.default)(coreToNestedSync)).toBe('function');
  });
  it('returns falsy item', function () {
    var item = null;
    expect(coreToNestedSync({
      denormalize: true,
      extractRelationships: true,
      item: item,
      type: 'specimen'
    })).toEqual(null);
  });

  it('returns denormalized item with nested item keys', function () {
    var getItemByTypeId = function getItemByTypeId(type, id) {
      return {
        id: id,
        resolved: true
      };
    };

    var nestedItem = coreToNestedSync({
      denormalize: true,
      extractRelationships: true,
      getItemByTypeId: getItemByTypeId,
      item: apiFormatSpecimen,
      type: 'specimen'
    });
    var nestedItemKeys = (0, _keys2.default)(nestedItem).sort();
    expect(nestedItemKeys).toEqual(['id', 'individual']);
  });

  it('returns non-denormalized item with expected content', function () {
    var getItemByTypeId = function getItemByTypeId(type, id) {
      return {
        id: id,
        resolved: true
      };
    };

    var testValue = coreToNestedSync({
      denormalize: false,
      extractRelationships: true,
      getItemByTypeId: getItemByTypeId,
      item: apiFormatPhysicalObject,
      type: 'physicalObject'
    });

    var expectedResult = nestedPhysicalObjectWithRelationships;

    expect(testValue).toEqual(expectedResult);
  });

  describe('deeper check of denormalized nested item format', function () {
    var nestedItem = void 0;
    var individual = void 0;
    beforeEach(function () {
      var getItemByTypeId = function getItemByTypeId(type, id) {
        return {
          id: id,
          resolved: true,
          type: type
        };
      };

      nestedItem = coreToNestedSync({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId: getItemByTypeId,
        item: apiFormatSpecimen,
        type: 'specimen'
      });
      individual = nestedItem.individual;
    });

    it('has expected individual keys', function () {
      var individualKeys = (0, _keys2.default)(individual).sort();
      expect(individualKeys).toEqual(['collectingInformation', 'collectionItems', 'determinations', 'featureObservations', 'identifiers', 'lid', 'recordHistoryEvents', 'taxonInformation']);
    });
    it('has collectingInformation', function () {
      var attribute = individual.collectingInformation;
      var expectedFormat = [{
        collectorsText: 'collectorsText',
        event: {
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
          lid: 'd61ec620-e5df-4141-8691-a0fe42ec0c5b'
        },
        lid: '06c5b25b-13dd-4c27-8bc2-18723fb1beb3'
      }];
      expect(attribute).toEqual(expectedFormat);
    });
    it('has collectionItems', function () {
      var getItemByTypeId = function getItemByTypeId(type, id) {
        if (type === 'physicalObject') {
          return {
            attributes: { lid: '24bf4bb4-f865-4182-a010-34aa898d845d' },
            id: id,
            resolved: true,
            type: type
          };
        }

        return {
          id: id,
          resolved: true,
          type: type
        };
      };

      var nestedSpecimen = coreToNestedSync({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId: getItemByTypeId,
        item: apiFormatSpecimen,
        type: 'specimen'
      });

      var attribute = nestedSpecimen.individual.collectionItems;

      var expectedFormat = [{
        alternateIdentifiersText: 'alternateIdentifiersText',
        physicalObject: {
          id: '2234',
          lid: '24bf4bb4-f865-4182-a010-34aa898d845d'
        },
        physicalObjectText: 'physicalObjectText',
        lid: 'f1479610-6618-49e7-b148-8fbaeaacbcdd'
      }];
      expect(attribute).toEqual(expectedFormat);
    });
    it('has determinations', function () {
      var attribute = individual.determinations;
      var expectedFormat = [{
        determinationVerbatim: 'determinationVerbatim',
        determinedByAgentText: 'determinedByAgentText',
        remarks: 'remarks',
        taxon: {
          id: '2367',
          type: 'taxon'
        },
        lid: '3a823494-b06f-4202-80c3-a8bf58d2dd40'
      }];
      expect(attribute).toEqual(expectedFormat);
    });
    it('has featureObservations', function () {
      var attribute = individual.featureObservations;
      var expectedFormat = [{
        featureObservationAgentText: 'featureObservationAgentText',
        featureObservationText: '21',
        featureType: {
          id: '1'
        },
        methodText: 'methodText',
        lid: 'b7973764-992a-4c42-816a-566e2c4ada7e'
      }];
      expect(attribute).toEqual(expectedFormat);
    });
    it('has identifiers', function () {
      var attribute = individual.identifiers;
      var expectedFormat = [{
        identifierType: {
          id: 1
        },
        nameSpace: '',
        value: '123456',
        publishRecord: true,
        remarks: '',
        lid: '34674e21-924c-4c1a-8c91-c15758cce3af'
      }];

      expect(attribute).toEqual(expectedFormat);
    });
    it('has lid', function () {
      var attribute = individual.lid;
      var expectedFormat = '6958cbc2-4c47-4bb8-bb56-c60f7c37b79f';

      expect(attribute).toEqual(expectedFormat);
    });
    it('has recordHistoryEvents', function () {
      var attribute = individual.recordHistoryEvents;
      var expectedFormat = [{
        agent: {
          id: '1'
        },
        date: {
          dateText: '2018'
        },
        lid: '35677dc2-73ed-4478-889c-d7fe5f7565c1'
      }];
      expect(attribute).toEqual(expectedFormat);
    });
    it('has taxonInformation', function () {
      var attribute = individual.taxonInformation;
      var expectedFormat = {
        lid: '9b6bd5ea-5605-463a-9262-1e83fd618b14'
      };
      expect(attribute).toEqual(expectedFormat);
    });
  });
});