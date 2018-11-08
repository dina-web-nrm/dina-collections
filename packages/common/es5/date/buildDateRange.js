'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTimestampFromYMD = require('./getTimestampFromYMD');

var DATE_TYPES = ['latest', 'range', 'single'];

module.exports = function buildDateRange(_ref) {
  var startDay = _ref.startDay,
      startMonth = _ref.startMonth,
      startYear = _ref.startYear,
      endDay = _ref.endDay,
      endMonth = _ref.endMonth,
      endYear = _ref.endYear,
      dateType = _ref.dateType,
      dateText = _ref.dateText,
      remarks = _ref.remarks;

  if (!DATE_TYPES.includes(dateType)) {
    throw new Error('Unknown dataType: ' + dateType);
  }

  var range = {};
  if (startDay || startMonth || startYear) {
    var interpretedTimestamp = getTimestampFromYMD({
      day: startDay,
      isStartDate: true,
      month: startMonth,
      year: startYear
    });
    range.startDate = {
      day: startDay ? Number(startDay) : undefined,
      interpretedTimestamp: interpretedTimestamp,
      month: startMonth ? Number(startMonth) : undefined,
      year: startYear ? Number(startYear) : undefined
    };
  }

  if (remarks) {
    range.remarks = remarks;
  }

  if (endDay || endMonth || endYear) {
    var _interpretedTimestamp = getTimestampFromYMD({
      day: endDay,
      isEndDate: true,
      month: endMonth,
      year: endYear
    });
    range.endDate = {
      day: endDay ? Number(endDay) : undefined,
      interpretedTimestamp: _interpretedTimestamp,
      month: endMonth ? Number(endMonth) : undefined,
      year: endYear ? Number(endYear) : undefined
    };
  }

  if (dateText) {
    range.dateText = dateText;
  }

  return (0, _keys2.default)(range).length ? range : null;
};