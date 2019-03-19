'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildDateRange = require('./buildDateRange');
var getInterpretedTimestampFromYMD = require('./getInterpretedTimestampFromYMD');

var _require = require('./constants'),
    OPEN_RANGE = _require.OPEN_RANGE,
    RANGE = _require.RANGE;

module.exports = function getInterpretedDateRangeFromOneDate(_ref) {
  var dateType = _ref.dateType,
      endDayInput = _ref.endDay,
      endMonthInput = _ref.endMonth,
      endYearInput = _ref.endYear,
      startDayInput = _ref.startDay,
      startMonthInput = _ref.startMonth,
      startYearInput = _ref.startYear,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['dateType', 'endDay', 'endMonth', 'endYear', 'startDay', 'startMonth', 'startYear']);

  if (!dateType) {
    return buildDateRange((0, _extends3.default)({}, rest));
  }

  var endDay = endDayInput ? Number(endDayInput) : undefined;
  var endMonth = endMonthInput ? Number(endMonthInput) : undefined;
  var endYear = endYearInput ? Number(endYearInput) : undefined;

  var startDay = startDayInput ? Number(startDayInput) : undefined;
  var startMonth = startMonthInput ? Number(startMonthInput) : undefined;
  var startYear = startYearInput ? Number(startYearInput) : undefined;

  if (dateType === OPEN_RANGE || dateType === RANGE) {
    return buildDateRange((0, _extends3.default)({}, rest, {
      dateType: dateType,

      endDay: endDay,
      endInterpretedTimestamp: getInterpretedTimestampFromYMD({
        day: endDay,
        isEndDate: true,
        month: endMonth,
        moveCurrentYearEndDateToNow: true,
        year: endYear
      }),
      endMonth: endMonth,
      endYear: endYear,

      startDay: startDay,
      startInterpretedTimestamp: getInterpretedTimestampFromYMD({
        day: startDay,
        isStartDate: true,
        month: startMonth,
        year: startYear
      }),
      startMonth: startMonth,
      startYear: startYear
    }));
  }

  throw new Error('dateType ' + dateType + ' not compatible with getInterpretedDateRangeFromTwoDates. maybe you should use getInterpretedDateRangeFromOneDate?');
};