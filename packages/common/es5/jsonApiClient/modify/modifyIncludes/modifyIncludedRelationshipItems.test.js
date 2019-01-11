'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./modifyIncludedRelationshipItems'),
    modifyIncludedRelationshipItems = _require.modifyIncludedRelationshipItems,
    dep = _require.dep;

describe('jsonApiClient/modify/modifyIncludedRelationshipItems', function () {
  it('exports function modifyIncludedRelationshipItems', function () {
    expect(typeof modifyIncludedRelationshipItems === 'undefined' ? 'undefined' : (0, _typeof3.default)(modifyIncludedRelationshipItems)).toEqual('function');
  });

  it('exports dep', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  describe('with dependor', function () {
    var depSpies = void 0;
    var openApiClient = void 0;
    beforeEach(function () {
      depSpies = dep.createSpies({
        modifyIncludedRelationshipItem: function modifyIncludedRelationshipItem() {
          return _promise2.default.resolve({
            id: 1235,
            type: 'project'
          });
        }
      });
      openApiClient = {};
    });

    describe('Update case', function () {
      it('Call modifyIncludedRelationshipItem for each item', function () {
        var items = [{
          id: 1234
        }, {
          id: 1234
        }];
        return modifyIncludedRelationshipItems({
          items: items,
          openApiClient: openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['projects']
        }).then(function () {
          expect(depSpies.modifyIncludedRelationshipItem.mock.calls.length).toEqual(2);
        });
      });
    });
  });
});