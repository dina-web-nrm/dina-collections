'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toCoreFormat = require('./toCoreFormat');
var toNestedFormat = require('./toNestedFormat');
var denormalizedSpecimen = require('../normalize/testData/denormalizedSpecimen');


describe('formatObject/toCoreFormat', function () {
  it('is a function', function () {
    expect(typeof toCoreFormat === 'undefined' ? 'undefined' : (0, _typeof3.default)(toCoreFormat)).toBe('function');
  });

  it('dont throw in base case', function () {
    expect(function () {
      var apiFormatItem = toCoreFormat({
        extractRelationships: true,
        item: denormalizedSpecimen,
        normalize: true,
        type: 'specimen'
      });
      console.log('apiFormat', (0, _stringify2.default)(apiFormatItem, null, 2));

      var getItemByTypeId = function getItemByTypeId(type, id) {
        return {
          id: id,
          resolved: true
        };
      };

      var objectFormat = toNestedFormat({
        denormalize: true,
        getItemByTypeId: getItemByTypeId,
        item: apiFormatItem,
        resolveRelationships: true,
        type: 'specimen'
      });
    }).not.toThrow();
  });
});