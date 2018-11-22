'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./constants'),
    DATE_TYPES = _require.DATE_TYPES;

var createDeleteProperties = require('../createDeleteProperties');

var deleteNullProperties = createDeleteProperties(null);
var deleteUndefinedProperties = createDeleteProperties(undefined);

var getDatePart = function getDatePart(_ref) {
  var day = _ref.day,
      month = _ref.month,
      year = _ref.year,
      timestamp = _ref.timestamp,
      interpretedTimestamp = _ref.interpretedTimestamp;

  var datePart = deleteNullProperties(deleteUndefinedProperties({
    day: day,
    interpretedTimestamp: interpretedTimestamp,
    month: month,
    timestamp: timestamp,
    year: year
  }));

  return (0, _keys2.default)(datePart).length ? datePart : undefined;
};

module.exports = function buildDateRange(_ref2) {
  var startDay = _ref2.startDay,
      startMonth = _ref2.startMonth,
      startYear = _ref2.startYear,
      startTimestamp = _ref2.startTimestamp,
      startInterpretedTimestamp = _ref2.startInterpretedTimestamp,
      endDay = _ref2.endDay,
      endMonth = _ref2.endMonth,
      endYear = _ref2.endYear,
      endTimestamp = _ref2.endTimestamp,
      endInterpretedTimestamp = _ref2.endInterpretedTimestamp,
      dateType = _ref2.dateType,
      dateText = _ref2.dateText,
      remarks = _ref2.remarks;

  if (dateType && !DATE_TYPES.includes(dateType)) {
    throw new Error('Unknown dateType: ' + dateType);
  }

  var dateRange = deleteNullProperties(deleteUndefinedProperties({
    dateText: dateText,
    dateType: dateType,
    endDate: getDatePart({
      day: endDay,
      interpretedTimestamp: endInterpretedTimestamp,
      month: endMonth,
      timestamp: endTimestamp,
      year: endYear
    }),
    remarks: remarks,
    startDate: getDatePart({
      day: startDay,
      interpretedTimestamp: startInterpretedTimestamp,
      month: startMonth,
      timestamp: startTimestamp,
      year: startYear
    })
  }));

  return (0, _keys2.default)(dateRange).length ? dateRange : null;
};