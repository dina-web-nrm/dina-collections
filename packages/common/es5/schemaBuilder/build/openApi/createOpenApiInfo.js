'use strict';

module.exports = function createOpenApiInfo(input) {
  var info = input;

  if (info.versionInfo) {
    info['x-versionInfo'] = info.versionInfo;
    delete info.versionInfo;
  }
  return info;
};