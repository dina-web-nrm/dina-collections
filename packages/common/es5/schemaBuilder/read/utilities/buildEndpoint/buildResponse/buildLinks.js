'use strict';

module.exports = function buildLinks() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      selfLink = _ref.selfLink;

  if (!selfLink) {
    return undefined;
  }
  return {
    properties: {
      self: {
        example: 'https://domain' + selfLink,
        format: 'uri',
        type: 'string',
        'x-faker': 'internet.url'
      }
    },
    type: 'object'
  };
};