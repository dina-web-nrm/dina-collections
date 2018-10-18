'use strict';

var moment = require('moment');

module.exports = function formatAsTimestamp(dateValue) {
  if (!dateValue) {
    return dateValue;
  }
  return moment(dateValue).format(moment.defaultFormatUtc);
};