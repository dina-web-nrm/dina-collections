"use strict";

module.exports = function (_ref) {
  var item = _ref.item,
      input = _ref.input;
  var value = input.value;


  var collectingLocation = item.attributes && item.attributes.collectingLocation;
  if (!collectingLocation) {
    return false;
  }

  if (collectingLocation.place) {
    if (collectingLocation.place.indexOf(value) === 0) {
      return true;
    }
  }

  if (collectingLocation.collectingLocationN) {
    if (collectingLocation.collectingLocationN.indexOf(value) === 0) {
      return true;
    }
  }

  if (collectingLocation.collectingLocationT) {
    if (collectingLocation.collectingLocationT.indexOf(value) === 0) {
      return true;
    }
  }

  return false;
};