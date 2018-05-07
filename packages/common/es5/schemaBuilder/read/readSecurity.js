'use strict';

module.exports = function readSecurity() {
  return {
    bearerAuth: {
      bearerFormat: 'JWT',
      scheme: 'bearer',
      type: 'http'
    }
  };
};