'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var faker = require('json-schema-faker');

faker.option({ alwaysFakeOptionals: true, maxItems: 2 });
module.exports = function importFaker() {
  return _promise2.default.resolve(faker);
};