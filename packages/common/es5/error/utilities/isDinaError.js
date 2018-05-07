"use strict";

module.exports = function isDinaError(error) {
  return error && error._dinaError;
};