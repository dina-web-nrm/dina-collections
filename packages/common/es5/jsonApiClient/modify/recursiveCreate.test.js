'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLogMock = require('../../log/createLogMock');

var _require = require('./recursiveCreate'),
    recursiveCreate = _require.recursiveCreate,
    dep = _require.dep;

var clone = require('../utilities/clone');

describe('jsonApiClient/modify/recursiveCreate', function () {
  it('exports function recursiveCreate', function () {
    expect(typeof recursiveCreate === 'undefined' ? 'undefined' : (0, _typeof3.default)(recursiveCreate)).toEqual('function');
  });
  it('exports dep', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  it('rejects if openApiClient not provided', function () {
    expect.assertions(1);
    return expect(recursiveCreate({
      item: {
        type: 'user'
      },
      resourceType: 'user'
    })).rejects.toThrow('provide openApiClient');
  });

  it('rejects if item not provided', function () {
    expect.assertions(1);
    return expect(recursiveCreate({
      openApiClient: {},
      resourceType: 'user'
    })).rejects.toThrow('item is required');
  });

  it('rejects if item type not provided', function () {
    expect.assertions(1);
    return expect(recursiveCreate({
      item: {},
      openApiClient: {},
      resourceType: 'user'
    })).rejects.toThrow('item type is required');
  });

  it('rejects if resourceType not provided', function () {
    expect.assertions(1);
    return expect(recursiveCreate({
      item: {
        type: 'user'
      },
      openApiClient: {}
    })).rejects.toThrow('resourceType is required');
  });

  it('rejects if item.id provided', function () {
    expect.assertions(1);
    return expect(recursiveCreate({
      item: {
        id: 2,
        type: 'user'
      },
      openApiClient: {}
    })).rejects.toThrow('id not allowed');
  });

  it('rejects if resourceType !== item.type', function () {
    expect.assertions(1);
    return expect(recursiveCreate({
      item: {
        type: 'user'
      },
      openApiClient: {},
      resourceType: 'specimen'
    })).rejects.toThrow('wrong item type: user for resourceType: specimen');
  });

  describe('with dependor', function () {
    var depSpies = void 0;
    var openApiClient = void 0;
    var createdItem = void 0;
    var updatedRelationships = void 0;
    var testLog = void 0;
    beforeEach(function () {
      testLog = createLogMock('test');
      createdItem = {
        attributes: {
          name: 'Alan'
        },
        id: '123',
        type: 'user'
      };
      depSpies = dep.createSpies({
        createWithRelationships: function createWithRelationships() {
          return _promise2.default.resolve({ data: createdItem });
        },
        modifyIncludes: function modifyIncludes(_ref) {
          var relationships = _ref.relationships;

          if (!relationships) {
            return _promise2.default.resolve({});
          }
          updatedRelationships = {
            projects: {
              data: [{
                id: 1,
                type: 'project'
              }]
            }
          };
          return _promise2.default.resolve(updatedRelationships);
        }
      });
      openApiClient = {};
    });
    describe('when relationhips provided', function () {
      var item = void 0;
      var result = void 0;
      beforeEach(function () {
        item = {
          attributes: {
            name: 'Eva'
          },
          relationships: {
            projects: {
              data: [{
                id: 1,
                type: 'project'
              }]
            }
          },
          type: 'user'
        };
        return recursiveCreate({
          item: item,
          log: testLog,
          openApiClient: {},
          resourceType: 'user'
        }).then(function (res) {
          result = res;
        });
      });

      it('call modifyIncludes', function () {
        expect(depSpies.modifyIncludes.mock.calls.length).toEqual(1);
        expect(clone(depSpies.modifyIncludes.mock.calls[0][0])).toEqual(clone({
          log: testLog.scope(),
          openApiClient: openApiClient,
          relationships: item.relationships,
          resourcePath: 'user'
        }));
      });

      it('call createWithRelationships', function () {
        expect(depSpies.createWithRelationships.mock.calls.length).toEqual(1);
        expect(clone(depSpies.createWithRelationships.mock.calls[0][0])).toEqual(clone({
          item: {
            attributes: item.attributes,
            relationships: {
              projects: { data: [{ id: 1, type: 'project' }] }
            },
            type: item.type
          },
          log: testLog.scope(),
          openApiClient: openApiClient,
          resourcePath: 'user'
        }));
      });

      it('return created item', function () {
        expect(result).toEqual({ data: createdItem });
      });
    });

    describe('when relationhips not provided', function () {
      var item = void 0;
      var result = void 0;
      beforeEach(function () {
        item = {
          attributes: {
            name: 'Eva'
          },
          type: 'user'
        };
        return recursiveCreate({
          item: item,
          log: testLog,
          openApiClient: {},
          resourceType: 'user'
        }).then(function (res) {
          result = res;
        });
      });

      it('call modifyIncludes', function () {
        expect(depSpies.modifyIncludes.mock.calls.length).toEqual(1);
        expect(clone(depSpies.modifyIncludes.mock.calls[0][0])).toEqual(clone({
          log: testLog.scope(),
          openApiClient: openApiClient,
          resourcePath: 'user'
        }));
      });

      it('call createWithRelationships', function () {
        expect(depSpies.createWithRelationships.mock.calls.length).toEqual(1);
        expect(clone(depSpies.createWithRelationships.mock.calls[0][0])).toEqual(clone({
          item: {
            attributes: item.attributes,
            relationships: {},
            type: item.type
          },
          log: testLog.scope(),
          openApiClient: openApiClient,
          resourcePath: 'user'
        }));
      });
      it('return created item', function () {
        expect(result).toEqual({ data: createdItem });
      });
    });
  });
});