'use strict';

var _require = require('../error/validators/coordinates'),
    latitude = _require.latitude,
    longitude = _require.longitude;

var _require2 = require('../error/validators/date'),
    bothStartAndEndDateRequiredIfOneProvided = _require2.bothStartAndEndDateRequiredIfOneProvided,
    createValidationIfDateTypeRange = _require2.createValidationIfDateTypeRange,
    dateRangeStartDateNotAfterEndDate = _require2.dateRangeStartDateNotAfterEndDate,
    noOrphanDayRange = _require2.noOrphanDayRange,
    noOrphanMonthRange = _require2.noOrphanMonthRange,
    pastDateRange = _require2.pastDateRange,
    validIfNotEmptyRange = _require2.validIfNotEmptyRange;

module.exports = {
  'x-validation-date-range-end-after-start': {
    schema: false,
    type: 'object',
    validate: createValidationIfDateTypeRange(dateRangeStartDateNotAfterEndDate)
  },
  'x-validation-date-range-in-the-past': {
    schema: false,
    type: 'object',
    validate: pastDateRange
  },
  'x-validation-date-range-no-orphan-day': {
    schema: false,
    type: 'object',
    validate: noOrphanDayRange
  },
  'x-validation-date-range-no-orphan-month': {
    schema: false,
    type: 'object',
    validate: noOrphanMonthRange
  },
  'x-validation-date-range-start-and-end': {
    schema: false,
    type: 'object',
    validate: createValidationIfDateTypeRange(bothStartAndEndDateRequiredIfOneProvided)
  },
  'x-validation-date-range-valid-if-not-empty': {
    schema: false,
    type: 'object',
    validate: validIfNotEmptyRange
  },
  'x-validation-latitude': {
    schema: false,
    type: 'string',
    validate: latitude
  },
  'x-validation-longitude': {
    schema: false,
    type: 'string',
    validate: longitude
  }
};