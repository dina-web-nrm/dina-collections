'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLogMock = require('../../../log/createLogMock');

var _require = require('./index'),
    modifyIncludes = _require.modifyIncludes,
    dep = _require.dep;

var clone = require('../../utilities/clone');

describe('jsonApiClient/modify/modifyIncludes', function () {
  it('exports function modifyIncludes', function () {
    expect(typeof modifyIncludes === 'undefined' ? 'undefined' : (0, _typeof3.default)(modifyIncludes)).toEqual('function');
  });
  it('exports dep', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  it('rejects if openApiClient not provided', function () {
    expect.assertions(1);
    return expect(modifyIncludes({
      relationships: {}
    })).rejects.toThrow('provide openApiClient');
  });

  it('return empty object if relationships not provided', function () {
    expect.assertions(1);
    return modifyIncludes({
      openApiClient: {}
    }).then(function (output) {
      expect(output).toEqual({});
    });
  });

  it('return empty object if relationships is empty object ', function () {
    expect.assertions(1);
    return modifyIncludes({
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
        modifyIncludedRelationship: function modifyIncludedRelationship(_ref) {
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
        return modifyIncludes({
          includesToModify: ['user.projects'],
          log: testLog,
          openApiClient: openApiClient,
          relationships: relationshipsInput,
          resourcePath: 'user'
        }).then(function (res) {
          result = res;
        });
      });
      it('call modifyIncludedRelationship', function () {
        expect(depSpies.modifyIncludedRelationship.mock.calls.length).toEqual(1);
        expect(clone(depSpies.modifyIncludedRelationship.mock.calls[0][0])).toEqual(clone({
          includesToModify: ['user.projects'],
          log: { scopeLevel: 0 },
          openApiClient: openApiClient,
          parentPath: 'user',
          relationKey: 'projects',
          relationship: {
            data: [{
              attributes: {
                name: 'coding'
              },
              type: 'project'
            }]
          },
          resourcePath: 'user.projects'
        }));
      });
      it('call log', function () {
        expect(testLog.debug.mock.calls.length).toEqual(1);
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
        return modifyIncludes({
          log: testLog,
          openApiClient: openApiClient,
          relationships: relationshipsInput,
          resourcePath: 'user'
        }).then(function (res) {
          result = res;
        });
      });
      it('call modifyIncludedRelationship for each relationship', function () {
        expect(depSpies.modifyIncludedRelationship.mock.calls.length).toEqual(2);
        expect(clone(depSpies.modifyIncludedRelationship.mock.calls[0][0])).toEqual(clone({
          log: { scopeLevel: 0 },
          openApiClient: openApiClient,
          parentPath: 'user',
          relationKey: 'projects',
          relationship: {
            data: [{
              attributes: {
                name: 'coding'
              },
              type: 'project'
            }]
          },
          resourcePath: 'user.projects'
        }));

        expect(clone(depSpies.modifyIncludedRelationship.mock.calls[1][0])).toEqual(clone({
          log: { scopeLevel: 0 },
          openApiClient: openApiClient,
          parentPath: 'user',
          relationKey: 'role',
          relationship: {
            data: {
              attributes: {
                roleType: 'admin'
              },
              type: 'role'
            }
          },
          resourcePath: 'user.role'
        }));
      });
      it('call log', function () {
        expect(testLog.debug.mock.calls.length).toEqual(1);
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