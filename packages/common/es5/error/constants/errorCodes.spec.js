'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorCodes = require('./errorCodes');

describe('error/constants/errorCodes', function () {
  describe('export object', function () {
    it('Exports an object', function () {
      expect(errorCodes).toBeTruthy();
      expect(typeof errorCodes === 'undefined' ? 'undefined' : (0, _typeof3.default)(errorCodes)).toBe('object');
    });
    it('With errors', function () {
      expect((0, _keys2.default)(errorCodes).length > 0).toBe(true);
    });
  });

  describe('error formats', function () {
    (0, _keys2.default)(errorCodes).forEach(function (key) {
      var error = errorCodes[key];
      describe(key, function () {
        it('Error key match exported key', function () {
          expect(key).toBe(error.code);
        });
        it('Title set', function () {
          expect(error.title).toBeTruthy();
        });
        it('Description set', function () {
          expect(error.description).toBeTruthy();
        });
      });
    });
  });

  describe('required errors', function () {
    it('Has INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE', function () {
      expect(errorCodes.INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE).toBeTruthy();
    });

    it('Has INTERNAL_SERVER_ERROR_INVALID_STATUS_CODE', function () {
      expect(errorCodes.INTERNAL_SERVER_ERROR_INVALID_STATUS_CODE).toBeTruthy();
    });
  });
});