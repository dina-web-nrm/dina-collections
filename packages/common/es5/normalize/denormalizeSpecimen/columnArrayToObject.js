"use strict";

module.exports = function columnArrayToObject(columnArray) {
  if (!columnArray) {
    return columnArray;
  }
  return columnArray.reduce(function (obj, item) {
    obj[item.lid] = item;
    return obj;
  }, {});
};