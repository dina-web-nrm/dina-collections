'use strict';

var _require = require('../constants/storage'),
    LEVEL_INSTITUTION = _require.LEVEL_INSTITUTION,
    LEVEL_ROOM = _require.LEVEL_ROOM;

var extractNameWithFirstLevelParent = function extractNameWithFirstLevelParent(nestedStorageLocation) {
  if (!nestedStorageLocation) {
    return '';
  }
  var group = nestedStorageLocation.group,
      name = nestedStorageLocation.name;

  if (group === LEVEL_INSTITUTION || group === LEVEL_ROOM) {
    return name + ' [' + group + ']';
  }
  var parentName = extractNameWithFirstLevelParent(nestedStorageLocation.parent);
  return name + ' [' + group + ' in ' + parentName + ']';
};
module.exports = extractNameWithFirstLevelParent;