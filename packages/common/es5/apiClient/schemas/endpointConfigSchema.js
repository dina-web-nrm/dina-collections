'use strict';

module.exports = {
  additionalProperties: false,
  properties: {
    baseUrl: {
      type: 'string'
    },
    getExample: {
      not: {
        type: 'string'
      }
    },
    mapBody: {
      not: {
        type: 'string'
      }
    },
    mapHeaders: {
      not: {
        type: 'string'
      }
    },
    mapQueryParams: {
      not: {
        type: 'string'
      }
    },
    mapResponse: {
      not: {
        type: 'string'
      }
    },
    methodName: {
      type: 'string'
    },
    mock: {
      not: {
        type: 'string'
      }
    },
    operationId: {
      type: 'string'
    },
    pathname: {
      type: 'string'
    },
    validateBody: {
      not: {
        type: 'string'
      }
    },
    validateResponse: {
      not: {
        type: 'string'
      }
    }
  },
  required: []
};