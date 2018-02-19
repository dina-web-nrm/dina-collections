"use strict";

module.exports = function extractMethodsFromConfigs(configs, key) {
  return configs.map(function (config) {
    return config[key];
  });
};