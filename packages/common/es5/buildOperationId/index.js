'use strict';

var capitalizeFirstLetter = require('../stringFormatters/capitalizeFirstLetter');

module.exports = function buildOperationId(_ref) {
  var operationType = _ref.operationType,
      relationKey = _ref.relationKey,
      resource = _ref.resource;

  if (relationKey) {
    return '' + resource + capitalizeFirstLetter(operationType) + capitalizeFirstLetter(relationKey);
  }

  return '' + resource + capitalizeFirstLetter(operationType);
};