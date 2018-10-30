'use strict';

var moment = require('moment');

module.exports = function getYMDHMSFromTimestamp(timestamp) {
    return moment(timestamp).format('YYYY-MM-DD, HH:mm:ss');
};