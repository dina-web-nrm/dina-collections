"use strict";

module.exports = function buildYYYYMMDD(_ref) {
  var day = _ref.day,
      month = _ref.month,
      year = _ref.year;

  if (!year) {
    return undefined;
  }

  var YYYYMMDD = "" + year;

  if (month) {
    YYYYMMDD = YYYYMMDD.concat(("" + month).length === 1 ? "0" + month : "" + month);

    if (day) {
      YYYYMMDD = YYYYMMDD.concat(("" + day).length === 1 ? "0" + day : "" + day);
    }
  }

  return YYYYMMDD;
};