'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLogMock = require('../../../log/createLogMock');

var _require = require('./modifyIncludedRelationship'),
    modifyIncludedRelationship = _require.modifyIncludedRelationship,
    dep = _require.dep;

var clone = require('../../utilities/clone');

describe('jsonApiClient/modify/modifyIncludedRelationship', function () {
  it('exports function modifyIncludedRelationship', function () {
    expect(typeof modifyIncludedRelationship === 'undefined' ? 'undefined' : (0, _typeof3.default)(modifyIncludedRelationship)).toEqual('function');
  });
  it('exports dep', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  it('rejects if relationship not provided', function () {
    expect.assertions(1);
    return expect(modifyIncludedRelationship({})).rejects.toThrow('provide relationship');
  });

  it('rejects if relationship.data not provided', function () {
    expect.assertions(1);
    return expect(modifyIncludedRelationship({ relationship: {} })).rejects.toThrow('provide relationship.data');
  });

  describe('with dependor', function () {
    var depSpies = void 0;
    var openApiClient = void 0;
    var testLog = void 0;
    beforeEach(function () {
      testLog = createLogMock('test');

      depSpies = dep.createSpies({
        modifyIncludedRelationshipItem: function modifyIncludedRelationshipItem() {
          return _promise2.default.resolve({ id: 1, type: 'role' });
        },
        modifyIncludedRelationshipItems: function modifyIncludedRelationshipItems() {
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
        return modifyIncludedRelationship({
          log: testLog,
          openApiClient: openApiClient,
          relationship: relationshipInput
        }).then(function (res) {
          result = res;
        });
      });
      it('call modifyIncludedRelationshipItem', function () {
        expect(depSpies.modifyIncludedRelationshipItem.mock.calls.length).toEqual(1);
        expect(clone(depSpies.modifyIncludedRelationshipItem.mock.calls[0][0])).toEqual(clone({
          item: {
            attributes: {
              roleName: 'admin'
            },
            type: 'role'
          },
          log: { scopeLevel: 1 },
          openApiClient: openApiClient
        }));
      });
      it('dont call modifyIncludedRelationshipItems', function () {
        expect(depSpies.modifyIncludedRelationshipItems.mock.calls.length).toEqual(0);
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
        return modifyIncludedRelationship({
          log: testLog,
          openApiClient: openApiClient,
          relationship: relationshipInput
        }).then(function (res) {
          result = res;
        });
      });
      it('dont call modifyIncludedRelationshipItem', function () {
        expect(depSpies.modifyIncludedRelationshipItem.mock.calls.length).toEqual(0);
      });
      it('call modifyIncludedRelationshipItems', function () {
        expect(depSpies.modifyIncludedRelationshipItems.mock.calls.length).toEqual(1);
        expect(clone(depSpies.modifyIncludedRelationshipItems.mock.calls[0][0])).toEqual(clone({
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
          log: { scopeLevel: 0 },
          openApiClient: openApiClient
        }));
      });
      it('return updated relationship', function () {
        expect(result).toEqual({
          data: [{ id: 1, type: 'project' }, { id: 2, type: 'project' }]
        });
      });
    });
  });
});