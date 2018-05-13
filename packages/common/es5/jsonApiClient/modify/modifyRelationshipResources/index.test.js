'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLogMock = require('../../../log/createLogMock');

var _require = require('./index'),
    modifyRelationshipResources = _require.modifyRelationshipResources,
    dep = _require.dep;

var clone = require('../../utilities/clone');

describe('jsonApiClient/modify/modifyRelationshipResources', function () {
  it('exports function modifyRelationshipResources', function () {
    expect(typeof modifyRelationshipResources === 'undefined' ? 'undefined' : (0, _typeof3.default)(modifyRelationshipResources)).toEqual('function');
  });
  it('exports dep', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  it('rejects if openApiClient not provided', function () {
    expect.assertions(1);
    return expect(modifyRelationshipResources({
      relationships: {}
    })).rejects.toThrow('provide openApiClient');
  });

  it('return empty object if relationships not provided', function () {
    expect.assertions(1);
    return modifyRelationshipResources({
      openApiClient: {}
    }).then(function (output) {
      expect(output).toEqual({});
    });
  });

  it('return empty object if relationships is empty object ', function () {
    expect.assertions(1);
    return modifyRelationshipResources({
      openApiClient: {}
    }).then(function (output) {
      expect(output).toEqual({});
    });
  });

  describe('with dependor', function () {
    var depSpies = void 0;
    var openApiClient = void 0;
    var testLog = void 0;
    beforeEach(function () {
      testLog = createLogMock('test');

      depSpies = dep.createSpies({
        modifyRelationshipResource: function modifyRelationshipResource(_ref) {
          var relationKey = _ref.relationKey;

          if (relationKey === 'role') {
            return _promise2.default.resolve({
              data: {
                id: 1,
                type: 'role'
              }
            });
          }
          return _promise2.default.resolve({
            data: [{
              id: 1,
              type: 'project'
            }]
          });
        }
      });
      openApiClient = {};
    });
    describe('single relationhip', function () {
      var result = void 0;
      var relationshipsInput = void 0;
      beforeEach(function () {
        relationshipsInput = {
          projects: {
            data: [{
              attributes: {
                name: 'coding'
              },
              type: 'project'
            }]
          }
        };
        return modifyRelationshipResources({
          log: testLog,
          openApiClient: openApiClient,
          relationships: relationshipsInput,
          resourcesToModify: ['project']
        }).then(function (res) {
          result = res;
        });
      });
      it('call modifyRelationshipResource', function () {
        expect(depSpies.modifyRelationshipResource.mock.calls.length).toEqual(1);
        expect(clone(depSpies.modifyRelationshipResource.mock.calls[0][0])).toEqual(clone({
          log: testLog.scope(),
          openApiClient: openApiClient,
          relationKey: 'projects',
          relationship: {
            data: [{
              attributes: {
                name: 'coding'
              },
              type: 'project'
            }]
          },
          resourcesToModify: ['project']
        }));
      });
      it('call log', function () {
        expect(testLog.debug.mock.calls.length).toEqual(2);
      });
      it('return updated relationships', function () {
        expect(result).toEqual({
          projects: {
            data: [{ id: 1, type: 'project' }]
          }
        });
      });
    });
    describe('multiple relationhip', function () {
      var result = void 0;
      var relationshipsInput = void 0;
      beforeEach(function () {
        relationshipsInput = {
          projects: {
            data: [{
              attributes: {
                name: 'coding'
              },
              type: 'project'
            }]
          },
          role: {
            data: {
              attributes: {
                roleType: 'admin'
              },
              type: 'role'
            }
          }
        };
        return modifyRelationshipResources({
          log: testLog,
          openApiClient: openApiClient,
          relationships: relationshipsInput
        }).then(function (res) {
          result = res;
        });
      });
      it('call modifyRelationshipResource for each relationship', function () {
        expect(depSpies.modifyRelationshipResource.mock.calls.length).toEqual(2);
        expect(clone(depSpies.modifyRelationshipResource.mock.calls[0][0])).toEqual(clone({
          log: testLog.scope(),
          openApiClient: openApiClient,
          relationKey: 'projects',
          relationship: {
            data: [{
              attributes: {
                name: 'coding'
              },
              type: 'project'
            }]
          }
        }));

        expect(clone(depSpies.modifyRelationshipResource.mock.calls[1][0])).toEqual(clone({
          log: testLog.scope(),
          openApiClient: openApiClient,
          relationKey: 'role',
          relationship: {
            data: {
              attributes: {
                roleType: 'admin'
              },
              type: 'role'
            }
          }
        }));
      });
      it('call log', function () {
        expect(testLog.debug.mock.calls.length).toEqual(2);
      });
      it('return updated relationships', function () {
        expect(result).toEqual({
          projects: {
            data: [{ id: 1, type: 'project' }]
          },
          role: {
            data: {
              id: 1,
              type: 'role'
            }
          }
        });
      });
    });
  });
});