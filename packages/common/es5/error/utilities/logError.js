'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTestLog = require('../../log/testLog');

var log = createTestLog('error');

module.exports = function logError(_ref) {
  var code = _ref.code,
      description = _ref.description,
      parameterErrors = _ref.parameterErrors,
      stack = _ref.stack,
      title = _ref.title;

  log.err(code + ': ' + title);
  log.scope().err(description);

  if (parameterErrors) {
    log.scope().err((0, _stringify2.default)(parameterErrors || [], null, 2));
  }

  log.scope().err(stack);
};