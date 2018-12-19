'use strict';

var moment = require('moment');

var buildYYYYMMDD = require('./buildYYYYMMDD');

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

var getEndDateSuggestion = function getEndDateSuggestion(_ref) {
  var day = _ref.day,
      month = _ref.month,
      year = _ref.year;

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

var getStartDateSuggestion = function getStartDateSuggestion(_ref2) {
  var day = _ref2.day,
      month = _ref2.month,
      year = _ref2.year;

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

var getDateSuggestion = function getDateSuggestion(_ref3) {
  var day = _ref3.day,
      isEndDate = _ref3.isEndDate,
      isStartDate = _ref3.isStartDate,
      month = _ref3.month,
      year = _ref3.year;

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

module.exports = function getTimestampFromYMD(_ref4) {
  var day = _ref4.day,
      isEndDate = _ref4.isEndDate,
      isStartDate = _ref4.isStartDate,
      month = _ref4.month,
      year = _ref4.year;

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

  var isCurrentDay = moment().isSame(YYYYMMDD, 'day');

  var interpretedTimestamp = void 0;

  if (isCurrentDay && isEndDate) {
    interpretedTimestamp = moment();
  } else if (isEndDate) {
    interpretedTimestamp = moment(YYYYMMDD).endOf('date');
  } else {
    interpretedTimestamp = moment(YYYYMMDD).startOf('date');
  }

  return interpretedTimestamp.isValid() ? interpretedTimestamp.toISOString() : undefined;
};