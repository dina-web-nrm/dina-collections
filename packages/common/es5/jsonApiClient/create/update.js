'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./createWithRelationships'),
    createWithRelationships = _require2.createWithRelationships;

var dep = new Dependor({
  createWithRelationships: createWithRelationships
});

function update() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      openApiClient = _ref.openApiClient,
      resourceType = _ref.resourceType,
      userOptions = _ref.userOptions;

  var body = userOptions.body,
      _userOptions$pathPara = userOptions.pathParams,
      pathParams = _userOptions$pathPara === undefined ? {} : _userOptions$pathPara;

  return dep.createWithRelationships({
    openApiClient: openApiClient,
    resource: (0, _extends3.default)({}, body, { id: pathParams.id || body.id }),
    resourceType: resourceType
  });
}

module.exports = {
  dep: dep,
  update: update
};