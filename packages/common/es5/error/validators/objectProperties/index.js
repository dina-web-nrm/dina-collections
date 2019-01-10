"use strict";

var idRequired = function idRequired(obj) {
  if (obj && !obj.id) {
    return false;
  }

  return true;
};

exports.idRequired = idRequired;