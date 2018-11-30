'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getVersionFromRootPackageJson = require('./getVersionFromRootPackageJson');

Object.defineProperty(exports, 'getVersionFromRootPackageJson', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getVersionFromRootPackageJson).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }