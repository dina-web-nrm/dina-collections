'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLogMock = require('../../../log/createLogMock');

var _require = require('./modifyRelationshipResource'),
    modifyRelationshipResource = _require.modifyRelationshipResource,
    dep = _require.dep;

var clone = require('../../utilities/clone');

describe('jsonApiClient/modify/modifyRelationshipResource', function () {
  it('exports function modifyRelationshipResource', function () {
    expect(typeof modifyRelationshipResource === 'undefined' ? 'undefined' : (0, _typeof3.default)(modifyRelationshipResource)).toEqual('function');
  });
  it('exports dep', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  it('rejects if relationship not provided', function () {
    expect.assertions(1);
    return expect(modifyRelationshipResource({})).rejects.toThrow('provide relationship');
  });

  it('rejects if relationship.data not provided', function () {
    expect.assertions(1);
    return expect(modifyRelationshipResource({ relationship: {} })).rejects.toThrow('provide relationship.data');
  });

  describe('with dependor', function () {
    var depSpies = void 0;
    var openApiClient = void 0;
    var testLog = void 0;
    beforeEach(function () {
      testLog = createLogMock('test');

      depSpies = dep.createSpies({
        modifyRelatedResourceItem: function modifyRelatedResourceItem() {
          return _promise2.default.resolve({ id: 1, type: 'role' });
        },
        modifyRelatedResourceItems: function modifyRelatedResourceItems() {
          return _promise2.default.resolve([{ id: 1, type: 'project' }, { id: 2, type: 'project' }]);
        }
      });
      openApiClient = {};
    });
    describe('object relationhip', function () {
      var result = void 0;
      var relationshipInput = void 0;
      beforeEach(function () {
        relationshipInput = {
          data: {
            attributes: {
              roleName: 'admin'
            },
            type: 'role'
          }
        };
        return modifyRelationshipResource({
          log: testLog,
          openApiClient: openApiClient,
          relationship: relationshipInput
        }).then(function (res) {
          result = res;
        });
      });
      it('call modifyRelatedResourceItem', function () {
        expect(depSpies.modifyRelatedResourceItem.mock.calls.length).toEqual(1);
        expect(clone(depSpies.modifyRelatedResourceItem.mock.calls[0][0])).toEqual(clone({
          item: {
            attributes: {
              roleName: 'admin'
            },
            type: 'role'
          },
          log: testLog.scope(),
          openApiClient: openApiClient
        }));
      });
      it('dont call modifyRelatedResourceItems', function () {
        expect(depSpies.modifyRelatedResourceItems.mock.calls.length).toEqual(0);
      });
      it('call log', function () {
        expect(testLog.debug.mock.calls.length).toEqual(1);
      });
      it('return updated relationship', function () {
        expect(result).toEqual({ data: { id: 1, type: 'role' } });
      });
    });
    describe('array relationship', function () {
      var result = void 0;
      var relationshipInput = void 0;
      beforeEach(function () {
        relationshipInput = {
          data: [{
            attributes: {
              name: 'coding'
            },
            type: 'project'
          }, {
            attributes: {
              name: 'fishing'
            },
            type: 'project'
          }]
        };
        return modifyRelationshipResource({
          log: testLog,
          openApiClient: openApiClient,
          relationship: relationshipInput
        }).then(function (res) {
          result = res;
        });
      });
      it('dont call modifyRelatedResourceItem', function () {
        expect(depSpies.modifyRelatedResourceItem.mock.calls.length).toEqual(0);
      });
      it('call modifyRelatedResourceItems', function () {
        expect(depSpies.modifyRelatedResourceItems.mock.calls.length).toEqual(1);
        expect(clone(depSpies.modifyRelatedResourceItems.mock.calls[0][0])).toEqual(clone({
          items: [{
            attributes: {
              name: 'coding'
            },
            type: 'project'
          }, {
            attributes: {
              name: 'fishing'
            },
            type: 'project'
          }],
          log: testLog.scope(),
          openApiClient: openApiClient
        }));
      });
      it('call log', function () {
        expect(testLog.debug.mock.calls.length).toEqual(1);
      });
      it('return updated relationship', function () {
        expect(result).toEqual({
          data: [{ id: 1, type: 'project' }, { id: 2, type: 'project' }]
        });
      });
    });
  });
});