'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coreToNested = require('./coreToNested');
var apiFormatSpecimen = require('./utilities/testData/apiFormatSpecimen');

describe('formatObject/coreToNested', function () {
  it('is a function', function () {
    expect(typeof coreToNested === 'undefined' ? 'undefined' : (0, _typeof3.default)(coreToNested)).toBe('function');
  });

  var getItemByTypeId = void 0;
  beforeEach(function () {
    getItemByTypeId = function getItemByTypeId(type, id) {
      return new _promise2.default(function (resolve) {
        resolve({
          id: id,
          resolved: true,
          type: type
        });
      });
    };
  });

  it('returns a promise, i.e. an object with a then() method', function () {
    expect((0, _typeof3.default)(coreToNested({
      denormalize: true,
      extractRelationships: true,
      getItemByTypeId: getItemByTypeId,
      item: apiFormatSpecimen,
      type: 'specimen'
    }).then)).toBe('function');
  });
  it('resolves falsy item', function () {
    var item = null;
    expect.assertions(1);
    return coreToNested({
      denormalize: true,
      extractRelationships: true,
      getItemByTypeId: getItemByTypeId,
      item: item,
      type: 'specimen'
    }).then(function (res) {
      expect(res).toBe(null);
    });
  });

  describe('deeper check of denormalized nested item format', function () {
    var individual = void 0;
    beforeEach(function () {
      return coreToNested({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId: getItemByTypeId,
        item: apiFormatSpecimen,
        type: 'specimen'
      }).then(function (nestedItem) {
        individual = nestedItem.individual;
      });
    });

    it('resolves with an item with nested keys', function () {
      expect.assertions(1);
      return coreToNested({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId: getItemByTypeId,
        item: apiFormatSpecimen,
        type: 'specimen'
      }).then(function (item) {
        expect((0, _keys2.default)(item).sort()).toEqual(['id', 'individual']);
      });
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
      var customGetItemByTypeId = function customGetItemByTypeId(type, id) {
        return new _promise2.default(function (resolve) {
          if (type === 'physicalObject') {
            resolve({
              attributes: { lid: '24bf4bb4-f865-4182-a010-34aa898d845d' },
              id: id,
              resolved: true,
              type: type
            });
          }

          resolve({
            id: id,
            resolved: true,
            type: type
          });
        });
      };

      expect.assertions(1);
      return coreToNested({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId: customGetItemByTypeId,
        item: apiFormatSpecimen,
        type: 'specimen'
      }).then(function (nestedSpecimen) {
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