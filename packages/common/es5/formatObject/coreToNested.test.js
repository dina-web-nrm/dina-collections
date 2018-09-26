'use strict';

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
      return _promise2.default.resolve().then(function () {
        if (type === 'identifierType') {
          return {
            attributes: {
              key: 'catalog-number',
              name: 'catalog number'
            },
            id: id,

            type: type
          };
        }

        if (type === 'physicalObject') {
          return {
            attributes: { lid: '24bf4bb4-f865-4182-a010-34aa898d845d' },
            id: id,

            type: type
          };
        }

        return {
          attributes: {},
          id: id,
          type: type
        };
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
});