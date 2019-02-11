'use strict';

var _require = require('../constants/storage'),
    LEVEL_ROOM = _require.LEVEL_ROOM;

var extractNameWithFirstLevelParent = function extractNameWithFirstLevelParent(nestedStorageLocation) {
  if (!nestedStorageLocation) {
    return '';
  }

  var group = nestedStorageLocation.group,
      name = nestedStorageLocation.name;

  if (group === LEVEL_ROOM) {
    return name;
  }

  var parentName = extractNameWithFirstLevelParent(nestedStorageLocation.parent);
  return name + ' [' + group + ' in ' + parentName + ']';
};

module.exports = extractNameWithFirstLevelParent;