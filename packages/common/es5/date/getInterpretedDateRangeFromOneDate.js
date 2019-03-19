'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildDateRange = require('./buildDateRange');
var getEarliestTimestamp = require('./getEarliestTimestamp');
var getInterpretedTimestampFromYMD = require('./getInterpretedTimestampFromYMD');

var _require = require('./constants'),
    LATEST = _require.LATEST,
    SINGLE = _require.SINGLE;

module.exports = function getInterpretedDateRangeFromOneDate(_ref) {
  var dateType = _ref.dateType,
      dayInput = _ref.day,
      monthInput = _ref.month,
      yearInput = _ref.year,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['dateType', 'day', 'month', 'year']);

  if (!dateType) {
    return buildDateRange((0, _extends3.default)({}, rest));
  }

  var day = dayInput ? Number(dayInput) : undefined;
  var month = monthInput ? Number(monthInput) : undefined;
  var year = yearInput ? Number(yearInput) : undefined;

  if (dateType === LATEST) {
    return buildDateRange((0, _extends3.default)({}, rest, {
      dateType: dateType,

      endDay: day,
      endInterpretedTimestamp: getInterpretedTimestampFromYMD({
        day: day,
        isEndDate: true,
        month: month,
        moveCurrentYearEndDateToNow: true,
        year: year
      }),
      endMonth: month,
      endYear: year,

      startInterpretedTimestamp: getEarliestTimestamp()
    }));
  }

  if (dateType === SINGLE) {
    return buildDateRange((0, _extends3.default)({}, rest, {
      dateType: dateType,

      endDay: day,
      endInterpretedTimestamp: getInterpretedTimestampFromYMD({
        day: day,
        isEndDate: true,
        month: month,
        moveCurrentYearEndDateToNow: true,
        year: year
      }),
      endMonth: month,
      endYear: year,

      startDay: day,
      startInterpretedTimestamp: getInterpretedTimestampFromYMD({
        day: day,
        isStartDate: true,
        month: month,
        year: year
      }),
      startMonth: month,
      startYear: year
    }));
  }

  throw new Error('dateType ' + dateType + ' not compatible with getInterpretedDateRangeFromOneDate. maybe you should use getInterpretedDateRangeFromTwoDates?');
};