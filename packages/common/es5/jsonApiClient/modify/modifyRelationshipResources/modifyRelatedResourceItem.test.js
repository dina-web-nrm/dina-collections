'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLogMock = require('../../../log/createLogMock');
var clone = require('../../utilities/clone');

var _require = require('./modifyRelatedResourceItem'),
    modifyRelatedResourceItem = _require.modifyRelatedResourceItem,
    dep = _require.dep,
    setDependencies = _require.setDependencies;

describe('jsonApiClient/modify/modifyRelatedResourceItem', function () {
  it('exports function modifyRelatedResourceItem', function () {
    expect(typeof modifyRelatedResourceItem === 'undefined' ? 'undefined' : (0, _typeof3.default)(modifyRelatedResourceItem)).toEqual('function');
  });
  it('exports function setDependencies', function () {
    expect(typeof setDependencies === 'undefined' ? 'undefined' : (0, _typeof3.default)(setDependencies)).toEqual('function');
  });
  it('exports dep', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  it('rejects if item not provided', function () {
    expect.assertions(1);
    return expect(modifyRelatedResourceItem({})).rejects.toThrow('missing item and it is not null');
  });
  it('accepts if item is null', function () {
    expect(function () {
      return modifyRelatedResourceItem({ item: null });
    }).not.toThrow();
  });

  describe('with dependor', function () {
    var depSpies = void 0;
    var openApiClient = void 0;
    var testLog = void 0;
    beforeEach(function () {
      setDependencies({
        recursiveCreate: function recursiveCreate() {
          return null;
        },
        recursiveUpdate: function recursiveUpdate() {
          return null;
        }
      });
      testLog = createLogMock('test');
      depSpies = dep.createSpies({
        recursiveCreate: function recursiveCreate() {
          return _promise2.default.resolve({
            data: {
              id: 1235,
              type: 'project'
            }
          });
        },
        recursiveUpdate: function recursiveUpdate() {
          return _promise2.default.resolve({
            data: {
              id: 1234,
              type: 'project'
            }
          });
        }
      });
      openApiClient = {};
    });
    describe('Update case', function () {
      it('Dont call recursiveUpdate if no attributes or relationships', function () {
        var item = {
          id: 1234
        };
        return modifyRelatedResourceItem({
          item: item,
          openApiClient: openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['projects']
        }).then(function () {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(0);
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(0);
        });
      });
      it('Call recursiveUpdate if item.id and attributes', function () {
        var item = {
          attributes: {
            name: 'coding'
          },
          id: 1234,
          type: 'project'
        };
        return modifyRelatedResourceItem({
          item: item,
          openApiClient: openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['project']
        }).then(function () {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(1);
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(0);

          expect(clone(depSpies.recursiveUpdate.mock.calls[0][0])).toEqual(clone({
            item: item,
            log: testLog.scope(),
            openApiClient: openApiClient,
            resourcesToModify: ['project'],
            resourceType: 'project'
          }));
        });
      });
      it('Call recursiveUpdate if item.id and relationships', function () {
        var item = {
          id: 1234,
          relationships: {
            owner: {
              id: 123,
              type: 'user'
            }
          },
          type: 'project'
        };
        return modifyRelatedResourceItem({
          item: item,
          openApiClient: openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['project']
        }).then(function () {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(1);
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(0);

          expect(clone(depSpies.recursiveUpdate.mock.calls[0][0])).toEqual(clone({
            item: item,
            log: testLog.scope(),
            openApiClient: openApiClient,
            resourcesToModify: ['project'],
            resourceType: 'project'
          }));
        });
      });
    });
    describe('Create case', function () {
      it('Call recursiveCreate if no id', function () {
        var item = {
          attributes: {
            name: 'coding'
          },
          type: 'project'
        };
        return modifyRelatedResourceItem({
          item: item,
          openApiClient: openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['project']
        }).then(function () {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(0);
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(1);

          expect(clone(depSpies.recursiveCreate.mock.calls[0][0])).toEqual(clone({
            item: item,
            log: testLog.scope(),
            openApiClient: openApiClient,
            resourcesToModify: ['project'],
            resourceType: 'project'
          }));
        });
      });
    });
  });
});