const { latitude, longitude } = require('../error/validators/coordinates')

const {
  bothStartAndEndDateRequiredIfOneProvided,
  createValidationIfDateTypeRange,
  dateRangeStartDateNotAfterEndDate,
  noOrphanDayRange,
  noOrphanMonthRange,
  pastDateRange,
  validIfNotEmptyRange,
} = require('../error/validators/date')

module.exports = {
  'x-validation-date-range-end-after-start': {
    schema: false,
    type: 'object',
    validate: createValidationIfDateTypeRange(
      dateRangeStartDateNotAfterEndDate
    ),
  },
  'x-validation-date-range-in-the-past': {
    schema: false,
    type: 'object',
    validate: pastDateRange,
  },
  'x-validation-date-range-no-orphan-day': {
    schema: false,
    type: 'object',
    validate: noOrphanDayRange,
  },
  'x-validation-date-range-no-orphan-month': {
    schema: false,
    type: 'object',
    validate: noOrphanMonthRange,
  },
  'x-validation-date-range-start-and-end': {
    schema: false,
    type: 'object',
    validate: createValidationIfDateTypeRange(
      bothStartAndEndDateRequiredIfOneProvided
    ),
  },
  'x-validation-date-range-valid-if-not-empty': {
    schema: false,
    type: 'object',
    validate: validIfNotEmptyRange,
  },
  'x-validation-latitude': {
    schema: false,
    type: 'string',
    validate: latitude,
  },
  'x-validation-longitude': {
    schema: false,
    type: 'string',
    validate: longitude,
  },
}
