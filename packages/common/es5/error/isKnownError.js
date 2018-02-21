"use strict";

module.exports = function isKnownError(error) {
  return error && error._known;
};