'use strict';

module.exports = function getModelColumn(model) {
  if (!model) {
    return null;
  }

  return model['x-column'];
};