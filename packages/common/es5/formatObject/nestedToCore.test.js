'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nestedToCore = require('./nestedToCore');
var coreToNested = require('./coreToNested');
var denormalizedSpecimen = require('./utilities/testData/denormalizedSpecimen');

describe('formatObject/nestedToCore', function () {
  it('is a function', function () {
    expect(typeof nestedToCore === 'undefined' ? 'undefined' : (0, _typeof3.default)(nestedToCore)).toBe('function');
  });

  it('dont throw in base case', function () {
    expect(function () {
      var apiFormatItem = nestedToCore({
        extractRelationships: true,
        item: denormalizedSpecimen,
        normalize: true,
        type: 'specimen'
      });

      var getItemByTypeId = function getItemByTypeId(type, id) {
        return {
          id: id,
          resolved: true
        };
      };

      coreToNested({
        denormalize: true,
        getItemByTypeId: getItemByTypeId,
        item: apiFormatItem,
        resolveRelationships: true,
        type: 'specimen'
      });
    }).not.toThrow();
  });
});