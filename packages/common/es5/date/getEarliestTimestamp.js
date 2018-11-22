'use strict';

var getTimestampFromYMD = require('./getTimestampFromYMD');

module.exports = function getEarliestTimestamp() {
  return getTimestampFromYMD({
    day: 1,
    isStartDate: true,
    month: 1,
    year: 1600
  });
};