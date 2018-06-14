'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nestedToCore = require('./nestedToCore');
var denormalizedSpecimen = require('./utilities/testData/denormalizedSpecimen');

describe('formatObject/nestedToCore', function () {
  it('is a function', function () {
    expect(typeof nestedToCore === 'undefined' ? 'undefined' : (0, _typeof3.default)(nestedToCore)).toBe('function');
  });
  it('returns a promise, i.e. an object with a then() method', function () {
    expect((0, _typeof3.default)(nestedToCore({
      extractRelationships: true,
      item: denormalizedSpecimen,
      normalize: true,
      type: 'specimen'
    }).then)).toBe('function');
  });
  it('resolves falsy item', function () {
    var item = null;
    expect.assertions(1);
    return nestedToCore({
      item: item,
      type: 'specimen'
    }).then(function (res) {
      expect(res).toBe(null);
    });
  });
  it('resolves with an item with core (api format) keys', function () {
    expect.assertions(1);
    return nestedToCore({
      extractRelationships: true,
      item: denormalizedSpecimen,
      normalize: true,
      type: 'specimen'
    }).then(function (item) {
      expect((0, _keys2.default)(item).sort()).toEqual(['attributes', 'id', 'relationships', 'type']);
    });
  });
  it('rejects if item is a string', function () {
    expect.assertions(2);
    return nestedToCore({
      extractRelationships: true,
      item: 'willReject',
      normalize: true,
      type: 'specimen'
    }).catch(function (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatch(/item must not be a string/);
    });
  });
});