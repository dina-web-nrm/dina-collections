'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./resolveByPath'),
    dep = _require.dep,
    resolveByPath = _require.resolveByPath;

describe('formatObject/relationships/utilities/resolveByPath', function () {
  describe('with Dependor', function () {
    var walkObject = void 0;

    beforeEach(function () {
      walkObject = jest.fn();
      dep.freeze();
      dep.mock({
        walkObject: walkObject
      });
    });

    afterEach(function () {
      dep.reset();
    });

    test('is a function', function () {
      var testValue = typeof resolveByPath === 'undefined' ? 'undefined' : (0, _typeof3.default)(resolveByPath);
      var expectedResult = 'function';

      expect(testValue).toEqual(expectedResult);
    });

    test('calls walkObject', function () {
      var formattedRelationshipItems = [{ card: 'king', id: '13' }, { card: 'ace', id: '1' }];
      var item = {
        game: {
          deck: [{ id: '13' }, { id: '1' }]
        }
      };
      var path = ['game.deck.*.card'];

      resolveByPath({
        formattedRelationshipItems: formattedRelationshipItems,
        item: item,
        path: path
      });

      expect(walkObject).toHaveBeenCalledTimes(1);
      expect(walkObject.mock.calls[0][0]).toBeTruthy();

      var args = walkObject.mock.calls[0][0];
      expect((0, _typeof3.default)(args.func)).toEqual('function');
      expect(args.obj).toEqual(item);
      expect(args.segments).toEqual(['game.deck', 'card']);
    });
  });
});