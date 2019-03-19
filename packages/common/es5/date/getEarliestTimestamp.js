'use strict';

var getInterpretedTimestampFromYMD = require('./getInterpretedTimestampFromYMD');

module.exports = function getEarliestTimestamp() {
  return getInterpretedTimestampFromYMD({
    day: 1,
    isStartDate: true,
    month: 1,
    year: 1600
  });
};