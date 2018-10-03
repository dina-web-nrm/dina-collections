'use strict';

module.exports = function buildYYYYMMDD(_ref) {
  var day = _ref.day,
      month = _ref.month,
      year = _ref.year;

  if (!year) {
    return undefined;
  }

  var parts = [year];

  if (month) {
    parts.push(('' + month).length === 1 ? '0' + month : '' + month);

    if (day) {
      parts.push(('' + day).length === 1 ? '0' + day : '' + day);
    }
  }

  return parts.join('-');
};