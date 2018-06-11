"use strict";

module.exports = function getModelType(model) {
  if (!model) {
    return null;
  }

  if (model && model.$ref) {
    return model.$ref;
  }

  if (model && model.items && model.items.$ref) {
    return model.items.$ref;
  }

  return null;
};