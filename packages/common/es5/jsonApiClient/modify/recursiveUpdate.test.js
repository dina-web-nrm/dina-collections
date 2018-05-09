'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLogMock = require('../../log/createLogMock');

var _require = require('./recursiveUpdate'),
    recursiveUpdate = _require.recursiveUpdate,
    dep = _require.dep;

var clone = require('../utilities/clone');

describe('jsonApiClient/modify/recursiveUpdate', function () {
  it('exports function recursiveUpdate', function () {
    expect(typeof recursiveUpdate === 'undefined' ? 'undefined' : (0, _typeof3.default)(recursiveUpdate)).toEqual('function');
  });
  it('exports dep', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  it('rejects if openApiClient not provided', function () {
    expect.assertions(1);
    return expect(recursiveUpdate({
      item: {
        type: 'user'
      },
      resourceType: 'user'
    })).rejects.toThrow('provide openApiClient');
  });

  it('rejects if item not provided', function () {
    expect.assertions(1);
    return expect(recursiveUpdate({
      openApiClient: {},
      resourceType: 'user'
    })).rejects.toThrow('item is required');
  });

  it('rejects if item type not provided', function () {
    expect.assertions(1);
    return expect(recursiveUpdate({
      item: {
        id: 2
      },
      openApiClient: {},
      resourceType: 'user'
    })).rejects.toThrow('item type is required');
  });

  it('rejects if resourceType not provided', function () {
    expect.assertions(1);
    return expect(recursiveUpdate({
      item: {
        id: 2,
        type: 'user'
      },
      openApiClient: {}
    })).rejects.toThrow('resourceType is required');
  });

  it('rejects if item.id not provided', function () {
    expect.assertions(1);
    return expect(recursiveUpdate({
      item: {
        type: 'user'
      },
      openApiClient: {}
    })).rejects.toThrow('id is required');
  });

  it('rejects if resourceType !== item.type', function () {
    expect.assertions(1);
    return expect(recursiveUpdate({
      item: {
        id: 2,
        type: 'user'
      },
      openApiClient: {},
      resourceType: 'specimen'
    })).rejects.toThrow('wrong item type: user for resourceType: specimen');
  });

  describe('with dependor', function () {
    var depSpies = void 0;
    var openApiClient = void 0;
    var updatedItem = void 0;
    var updatedRelationships = void 0;
    var testLog = void 0;
    beforeEach(function () {
      testLog = createLogMock('test');
      updatedItem = {
        attributes: {
          name: 'Alan'
        },
        id: '123',
        type: 'user'
      };
      depSpies = dep.createSpies({
        modifyRelationshipResources: function modifyRelationshipResources(_ref) {
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
        },
        update: function update() {
          return _promise2.default.resolve({ data: updatedItem });
        },
        updateRelationships: function updateRelationships() {
          return _promise2.default.resolve({});
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
          id: 2,
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
        return recursiveUpdate({
          item: item,
          log: testLog,
          openApiClient: {},
          resourceType: 'user'
        }).then(function (res) {
          result = res;
        });
      });

      it('call modifyRelationshipResources', function () {
        expect(depSpies.modifyRelationshipResources.mock.calls.length).toEqual(1);
        expect(clone(depSpies.modifyRelationshipResources.mock.calls[0][0])).toEqual(clone({
          log: testLog.scope(),
          openApiClient: openApiClient,
          relationships: item.relationships
        }));
      });

      it('call update', function () {
        expect(depSpies.update.mock.calls.length).toEqual(1);
        expect(clone(depSpies.update.mock.calls[0][0])).toEqual(clone({
          item: {
            attributes: item.attributes,
            id: item.id,
            type: item.type
          },
          log: testLog.scope(),
          openApiClient: openApiClient
        }));
      });

      it('call updateRelationships', function () {
        expect(depSpies.updateRelationships.mock.calls.length).toEqual(1);
        expect(clone(depSpies.updateRelationships.mock.calls[0][0])).toEqual(clone({
          item: updatedItem,
          log: testLog.scope(),
          openApiClient: openApiClient,
          relationships: updatedRelationships
        }));
      });
      it('call log', function () {
        expect(testLog.debug.mock.calls.length).toEqual(1);
      });
      it('return created item', function () {
        expect(result).toEqual(updatedItem);
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
          id: 1,
          type: 'user'
        };
        return recursiveUpdate({
          item: item,
          log: testLog,
          openApiClient: {},
          resourceType: 'user'
        }).then(function (res) {
          result = res;
        });
      });

      it('call modifyRelationshipResources', function () {
        expect(depSpies.modifyRelationshipResources.mock.calls.length).toEqual(1);
        expect(clone(depSpies.modifyRelationshipResources.mock.calls[0][0])).toEqual(clone({
          log: testLog.scope(),
          openApiClient: openApiClient
        }));
      });

      it('call update', function () {
        expect(depSpies.update.mock.calls.length).toEqual(1);
        expect(clone(depSpies.update.mock.calls[0][0])).toEqual(clone({
          item: {
            attributes: item.attributes,
            id: item.id,
            type: item.type
          },
          log: testLog.scope(),
          openApiClient: openApiClient
        }));
      });

      it('call updateRelationships', function () {
        expect(depSpies.updateRelationships.mock.calls.length).toEqual(1);
        expect(clone(depSpies.updateRelationships.mock.calls[0][0])).toEqual(clone({
          item: updatedItem,
          log: testLog.scope(),
          openApiClient: openApiClient,
          relationships: {}
        }));
      });
      it('call log', function () {
        expect(testLog.debug.mock.calls.length).toEqual(1);
      });
      it('return created item', function () {
        expect(result).toEqual(updatedItem);
      });
    });
  });
});