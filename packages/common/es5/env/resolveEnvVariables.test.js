'use strict';

var resolveEnvVariables = require('./resolveEnvVariables');

describe('config/resolveEnvVariables', function () {
  it('Return env variables if present', function () {
    expect(resolveEnvVariables({
      envVariables: ['HOST', 'PORT'],
      processEnv: {
        HOST: '127.0.0.1',
        NODE_ENV: 'test',
        PORT: '1234'
      }
    })).toEqual({
      HOST: '127.0.0.1',
      PORT: '1234'
    });
  });
  it('Return env variables if present and matching node env provided', function () {
    expect(resolveEnvVariables({
      envVariables: ['HOST', 'PORT'],
      nodeEnv: ['test', 'production'],
      processEnv: {
        HOST: '127.0.0.1',
        NODE_ENV: 'test',
        PORT: '1234'
      }
    })).toEqual({
      HOST: '127.0.0.1',
      PORT: '1234'
    });
  });
  it('Return empty object if env variables present but not matching node env provided', function () {
    expect(resolveEnvVariables({
      envVariables: ['HOST', 'PORT'],
      nodeEnv: ['test', 'production'],
      processEnv: {
        HOST: '127.0.0.1',
        NODE_ENV: 'development',
        PORT: '1234'
      }
    })).toEqual({});
  });
  it('Throws error if required and variable missing', function () {
    expect(function () {
      resolveEnvVariables({
        envVariables: ['HOST', 'PORT', 'TEST_USER'],
        processEnv: {
          HOST: '127.0.0.1',
          NODE_ENV: 'test',
          PORT: '1234'
        },
        required: true
      });
    }).toThrow();
  });
});