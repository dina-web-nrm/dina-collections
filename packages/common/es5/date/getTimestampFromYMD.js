'use strict';

var moment = require('moment');

module.exports = function getTimestampFromYMD(_ref) {
  var day = _ref.day,
      month = _ref.month,
      year = _ref.year;

  if (!(year && ('' + year).length === 4)) {
    return undefined;
  }

  var timestamp = moment.utc({
    day: day,
    month: month !== undefined ? month - 1 : undefined,
    year: year
  });

  if (timestamp.isValid()) {
    return timestamp.format();
  }
  return undefined;
};