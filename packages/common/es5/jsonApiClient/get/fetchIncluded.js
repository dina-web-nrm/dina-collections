'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createIncludeJobs = require('./createIncludeJobs');
var runIncludeJobs = require('./runIncludeJobs');

var fetchIncluded = function fetchIncluded(_ref) {
  var parentItems = _ref.items,
      openApiClient = _ref.openApiClient,
      path = _ref.path,
      relationSpecification = _ref.relationSpecification;

  var includeJobs = createIncludeJobs({
    parentItems: parentItems,
    relationSpecification: relationSpecification
  });
  if (!(includeJobs && includeJobs.length)) {
    return _promise2.default.resolve([]);
  }
  return runIncludeJobs({
    includeJobs: includeJobs,
    openApiClient: openApiClient
  }).then(function (fetchedItems) {
    console.log('fetchedItems', fetchedItems);
    return fetchIncluded({
      items: fetchedItems,
      openApiClient: openApiClient,
      path: path,
      relationSpecification: relationSpecification
    }).then(function (fetchedItemIncludes) {
      return [].concat((0, _toConsumableArray3.default)(fetchedItems), (0, _toConsumableArray3.default)(fetchedItemIncludes));
    });
  });
};

module.exports = fetchIncluded;