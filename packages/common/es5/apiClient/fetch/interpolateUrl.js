'use strict';

var pathParametersRegex = /\{([a-zA-Z0-9]+)}/g;

module.exports = function interpolateUrl(url, pathParams) {
  var resultURL = url;
  var requiredPathParameters = resultURL.match(pathParametersRegex) || [];

  requiredPathParameters.forEach(function (p) {
    var cleanParameter = p.replace(/[{}]/g, '');
    if (pathParams[cleanParameter] !== undefined) {
      resultURL = resultURL.replace('' + p, pathParams[cleanParameter]);
    } else {
      throw new Error('Required path parameter ' + cleanParameter + ' not supplied.');
    }
  });

  return resultURL;
};