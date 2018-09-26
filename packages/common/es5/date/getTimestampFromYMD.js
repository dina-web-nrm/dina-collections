'use strict';

var moment = require('moment');

var monthToDaysMap = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
};

var buildYYYYMMDD = function buildYYYYMMDD(_ref) {
  var day = _ref.day,
      month = _ref.month,
      year = _ref.year;

  if (!year) {
    return undefined;
  }

  var YYYYMMDD = '' + year;

  if (month) {
    YYYYMMDD = YYYYMMDD.concat(('' + month).length === 1 ? '0' + month : '' + month);

    if (day) {
      YYYYMMDD = YYYYMMDD.concat(('' + day).length === 1 ? '0' + day : '' + day);
    }
  }

  return YYYYMMDD;
};

var getEndDateSuggestion = function getEndDateSuggestion(_ref2) {
  var day = _ref2.day,
      month = _ref2.month,
      year = _ref2.year;

  var isLeapYear = moment([year]).isLeapYear();

  if (year && month && day) {
    return buildYYYYMMDD({
      day: day,
      month: month,
      year: year
    });
  }

  if (year && month) {
    return buildYYYYMMDD({
      day: month === 2 && isLeapYear ? 29 : monthToDaysMap[month],
      month: month,
      year: year
    });
  }

  return buildYYYYMMDD({
    day: 31,
    month: 12,
    year: year
  });
};

var getStartDateSuggestion = function getStartDateSuggestion(_ref3) {
  var day = _ref3.day,
      month = _ref3.month,
      year = _ref3.year;

  if (year && month && day) {
    return buildYYYYMMDD({
      day: day,
      month: month,
      year: year
    });
  }

  if (year && month) {
    return buildYYYYMMDD({
      day: 1,
      month: month,
      year: year
    });
  }

  return buildYYYYMMDD({
    day: 1,
    month: 1,
    year: year
  });
};

var getDateSuggestion = function getDateSuggestion(_ref4) {
  var day = _ref4.day,
      isEndDate = _ref4.isEndDate,
      isStartDate = _ref4.isStartDate,
      month = _ref4.month,
      year = _ref4.year;

  if (!year || ('' + year).length !== 4) {
    return undefined;
  }

  if (isStartDate) {
    return getStartDateSuggestion({
      day: day,
      month: month,
      year: year
    });
  }

  if (isEndDate) {
    return getEndDateSuggestion({
      day: day,
      month: month,
      year: year
    });
  }

  return buildYYYYMMDD({
    day: day,
    month: month,
    year: year
  });
};

module.exports = function getTimestampFromYMD(_ref5) {
  var day = _ref5.day,
      isEndDate = _ref5.isEndDate,
      isStartDate = _ref5.isStartDate,
      month = _ref5.month,
      year = _ref5.year;

  var YYYYMMDD = getDateSuggestion({
    day: day,
    isEndDate: isEndDate,
    isStartDate: isStartDate,
    month: month,
    year: year
  });

  if (!YYYYMMDD) {
    return undefined;
  }

  var interpretedTimestamp = isEndDate ? moment(YYYYMMDD).endOf('date') : moment(YYYYMMDD);

  return interpretedTimestamp.isValid() ? interpretedTimestamp.toISOString(true) : undefined;
};