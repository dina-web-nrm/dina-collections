'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorStatus = require('./errorStatus');

describe('error/constants/errorStatus', function () {
  describe('export object', function () {
    it('Exports an object', function () {
      expect(errorStatus).toBeTruthy();
      expect(typeof errorStatus === 'undefined' ? 'undefined' : (0, _typeof3.default)(errorStatus)).toBe('object');
    });
    it('With errors', function () {
      expect((0, _keys2.default)(errorStatus).length > 0).toBe(true);
    });
  });

  describe('errors', function () {
    (0, _keys2.default)(errorStatus).forEach(function (key) {
      var error = errorStatus[key];
      describe(key, function () {
        it('Error key match exported key', function () {
          expect(key).toBe(error.status);
        });
        it('Title set', function () {
          expect(error.title).toBeTruthy();
        });
      });
    });
  });
});