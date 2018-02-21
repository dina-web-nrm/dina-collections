'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function buildRelationships() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      format = _ref.format,
      relationBase = _ref.relationBase,
      relations = _ref.relations,
      selfLink = _ref.selfLink,
      versionsLink = _ref.versionsLink;

  var relationSelfLink = format === 'array' ? selfLink + '/{id}' : selfLink;

  var versionRelationship = versionsLink && {
    properties: {
      data: {
        items: {
          properties: {
            id: { type: 'string' },
            type: { type: 'string' }
          },
          type: 'object'
        },
        type: 'array'
      },
      links: {
        properties: {
          self: {
            example: 'https://domain' + versionsLink,
            format: 'uri',
            type: 'string'
          }
        },
        type: 'object'
      }
    },
    type: 'object'
  };

  var relationKeys = (relations || []).reduce(function (obj, _ref2) {
    var _ref2$format = _ref2.format,
        relationFormat = _ref2$format === undefined ? 'object' : _ref2$format,
        key = _ref2.key,
        link = _ref2.link,
        resourceInput = _ref2.resource;

    var resource = resourceInput || key;
    var data = {
      properties: {
        id: {
          example: '1234',
          type: 'string'
        },
        type: {
          example: resource,
          type: 'string'
        }
      },
      type: 'object'
    };

    var links = {
      properties: {
        self: {
          example: 'https://domain' + (link || (relationBase || relationSelfLink) + '/' + key),
          format: 'uri',
          type: 'string'
        }
      },
      type: 'object'
    };

    if (relationFormat === 'object') {
      return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, key, {
        properties: {
          data: data,
          links: links
        },
        type: 'object'
      }));
    }
    return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, key, {
      properties: {
        data: {
          items: data,
          type: 'array'
        },
        links: links
      },
      type: 'object'
    }));
  }, {});

  var relationships = {
    properties: {},
    type: 'object'
  };

  if (versionRelationship) {
    relationships.properties.versions = versionRelationship;
  }

  if (relationKeys) {
    relationships.properties = (0, _extends5.default)({}, relationships.properties, relationKeys);
  }

  return relationships;
};