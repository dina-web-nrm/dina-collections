"use strict";

var getItemByLid = function getItemByLid() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      lid = _ref.lid,
      _ref$relationshipItem = _ref.relationshipItems,
      relationshipItems = _ref$relationshipItem === undefined ? [] : _ref$relationshipItem;

  if (!lid || !relationshipItems.length) {
    return undefined;
  }

  return relationshipItems.find(function (item) {
    if (!item || !item.attributes) {
      return false;
    }

    return item.attributes.lid === lid;
  });
};

module.exports = { getItemByLid: getItemByLid };