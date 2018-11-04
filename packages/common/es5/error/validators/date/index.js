'use strict';

var moment = require('moment');
var objectPath = require('object-path');

var createValidationIfDateTypeRange = function createValidationIfDateTypeRange(func) {
  return function (value) {
    if (value && value.dateType === 'range') {
      return func(value);
    }

    return true;
  };
};

var validIfNotEmpty = function validIfNotEmpty(datePartValue) {
  if (!datePartValue) {
    return true;
  }

  var day = datePartValue.day,
      interpretedTimestamp = datePartValue.interpretedTimestamp,
      month = datePartValue.month,
      year = datePartValue.year;


  if ((day || month || year) && !interpretedTimestamp) {
    return false;
  }

  return true;
};

var validIfNotEmptyRange = function validIfNotEmptyRange(rangeValue) {
  if (!rangeValue) {
    return true;
  }

  var endDate = rangeValue.endDate,
      startDate = rangeValue.startDate;


  return validIfNotEmpty(endDate) && validIfNotEmpty(startDate);
};

var noOrphanDay = function noOrphanDay(datePartValue) {
  if (!datePartValue) {
    return true;
  }

  var day = datePartValue.day,
      month = datePartValue.month,
      year = datePartValue.year;


  if (day && (!month || !year)) {
    return false;
  }

  return true;
};

var noOrphanDayRange = function noOrphanDayRange(value) {
  return noOrphanDay(value && value.startDate) && noOrphanDay(value && value.endDate);
};

var noOrphanMonth = function noOrphanMonth(datePartValue) {
  if (!datePartValue) {
    return true;
  }

  var month = datePartValue.month,
      year = datePartValue.year;


  if (month && !year) {
    return false;
  }

  return true;
};

var noOrphanMonthRange = function noOrphanMonthRange(value) {
  return noOrphanMonth(value && value.startDate) && noOrphanMonth(value && value.endDate);
};

var pastSingleDate = function pastSingleDate(value) {
  if (!(value && value.interpretedTimestamp)) {
    return true;
  }

  var parsedInterpretedTimestamp = moment(value.interpretedTimestamp);

  if (moment(parsedInterpretedTimestamp).isAfter(moment.utc())) {
    return false;
  }

  return true;
};

var pastDateRange = function pastDateRange(value) {
  return pastSingleDate(value && value.startDate) && pastSingleDate(value && value.endDate, true);
};

var dateRangeStartDateNotAfterEndDate = function dateRangeStartDateNotAfterEndDate(value) {
  var startDateTimestamp = objectPath.get(value, 'startDate.interpretedTimestamp');
  var endDateTimestamp = objectPath.get(value, 'endDate.interpretedTimestamp');

  if (!(startDateTimestamp && endDateTimestamp)) {
    return true;
  }

  return !moment(startDateTimestamp).isAfter(endDateTimestamp);
};

var bothStartAndEndDateRequiredIfOneProvided = function bothStartAndEndDateRequiredIfOneProvided(value) {
  if (!value || !value.startDate && !value.endDate || !objectPath.get(value, 'startDate.interpretedTimestamp') && !objectPath.get(value, 'endDate.interpretedTimestamp')) {
    return true;
  }

  if (objectPath.get(value, 'startDate.interpretedTimestamp') && objectPath.get(value, 'endDate.interpretedTimestamp')) {
    return true;
  }

  return false;
};

var textParsable = function textParsable(value) {
  if (value && value.dateText && !value.interpretedTimestamp) {
    return false;
  }

  return true;
};

var intervalParsable = function intervalParsable(value) {
  return textParsable(value && value.startDate) && textParsable(value && value.endDate);
};

var isYYYYMMDD = function isYYYYMMDD(value) {
  if (value && value.startDate && value.startDate.dateText && !value.startDate.dateText.match(/(\d{4})-(\d{2})-(\d{2})/)) {
    return false;
  }

  if (value && value.endDate && value.endDate.dateText && !value.endDate.dateText.match(/(\d{4})-(\d{2})-(\d{2})/)) {
    return false;
  }

  return true;
};

exports.createValidationIfDateTypeRange = createValidationIfDateTypeRange;
exports.validIfNotEmpty = validIfNotEmpty;
exports.validIfNotEmptyRange = validIfNotEmptyRange;
exports.noOrphanDay = noOrphanDay;
exports.noOrphanDayRange = noOrphanDayRange;
exports.noOrphanMonth = noOrphanMonth;
exports.noOrphanMonthRange = noOrphanMonthRange;
exports.pastDateRange = pastDateRange;
exports.dateRangeStartDateNotAfterEndDate = dateRangeStartDateNotAfterEndDate;
exports.bothStartAndEndDateRequiredIfOneProvided = bothStartAndEndDateRequiredIfOneProvided;
exports.textParsable = textParsable;
exports.intervalParsable = intervalParsable;
exports.isYYYYMMDD = isYYYYMMDD;