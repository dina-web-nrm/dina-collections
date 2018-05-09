'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PRIVATE_NAMESPACE = '_dependor';

var getKey = function getKey(key) {
  return PRIVATE_NAMESPACE + '-' + key;
};

var testing = process.env.NODE_ENV === 'test';

var defaultMockHandler = function defaultMockHandler() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args;
};

var Dependor = function () {
  function Dependor() {
    var _this = this;

    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Dependor);

    var originalDependenciesKey = getKey('dependencies');
    this[originalDependenciesKey] = (0, _extends5.default)({}, dependencies);

    (0, _keys2.default)(dependencies).forEach(function (key) {
      if (_this[key]) {
        throw new Error('Cant add dependency ' + key + '. Already exists');
      }
      _this[key] = dependencies[key];
    });
  }

  (0, _createClass3.default)(Dependor, [{
    key: 'add',
    value: function add(dependencies) {
      var _this2 = this;

      (0, _keys2.default)(dependencies).forEach(function (key) {
        if (_this2[key]) {
          throw new Error('Cant add dependency ' + key + '. Already exists');
        }
        _this2[key] = dependencies[key];
      });
    }
  }, {
    key: 'createSpies',
    value: function createSpies() {
      console.error('not allowed to call autoMock outside test');
    }
  }, {
    key: 'mock',
    value: function mock() {
      console.error('not allowed to call reset outside test');
    }
  }, {
    key: 'reset',
    value: function reset() {
      console.error('not allowed to call reset outside test');
    }
  }, {
    key: 'freeze',
    value: function freeze() {
      console.error('not allowed to call freeze outside test');
    }
  }]);
  return Dependor;
}();

var createFreezeFunction = function createFreezeFunction(key) {
  return function () {
    throw new Error('Function ' + key + ' is frozen in dependor and should not be called');
  };
};

var TestDependor = function (_Dependor) {
  (0, _inherits3.default)(TestDependor, _Dependor);

  function TestDependor() {
    (0, _classCallCheck3.default)(this, TestDependor);
    return (0, _possibleConstructorReturn3.default)(this, (TestDependor.__proto__ || (0, _getPrototypeOf2.default)(TestDependor)).apply(this, arguments));
  }

  (0, _createClass3.default)(TestDependor, [{
    key: 'freeze',
    value: function freeze(keys) {
      var _this4 = this;

      var originalDependenciesKey = getKey('dependencies');
      var originalDependencies = this[originalDependenciesKey];
      var keysToFreeze = keys || (0, _keys2.default)(originalDependencies);
      this.mock(keysToFreeze.reduce(function (obj, key) {
        if (_this4[key] === originalDependencies[key]) {
          return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, key, createFreezeFunction(key)));
        }
        return obj;
      }, {}));
    }
  }, {
    key: 'createSpies',
    value: function createSpies(handlers) {
      var _this5 = this;

      var originalDependenciesKey = getKey('dependencies');
      var originalDependencies = this[originalDependenciesKey];
      return (0, _keys2.default)(originalDependencies).reduce(function (spies, dependency) {
        var spy = jest.fn();
        var func = function func() {
          spy.apply(undefined, arguments);
          var handler = handlers && handlers[dependency] || defaultMockHandler;
          return handler.apply(undefined, arguments);
        };
        _this5.mock((0, _defineProperty3.default)({}, dependency, func));
        return (0, _extends5.default)({}, spies, (0, _defineProperty3.default)({}, dependency, spy));
      }, {});
    }
  }, {
    key: 'mock',
    value: function mock(dependencies) {
      var _this6 = this;

      if (!testing) {
        throw new Error('Dependor _mock should only be used in testing');
      }
      (0, _keys2.default)(dependencies).forEach(function (key) {
        if (!_this6[key]) {
          throw new Error('Cant mock dependency ' + key + '. Dont exists');
        }
        _this6[key] = dependencies[key];
      });
    }
  }, {
    key: 'reset',
    value: function reset(keys) {
      var _this7 = this;

      if (!testing) {
        throw new Error('Dependor _reset should only be used in testing');
      }
      var originalDependenciesKey = getKey('dependencies');
      var originalDependencies = this[originalDependenciesKey];
      if (!keys) {
        return (0, _keys2.default)(originalDependencies).forEach(function (key) {
          _this7[key] = originalDependencies[key];
        });
      }

      if (Array.isArray(keys)) {
        return keys.forEach(function (key) {
          if (!_this7[key]) {
            throw new Error('Cant reset dependency ' + key + '. Dont exists');
          }
          _this7[key] = originalDependencies[key];
        });
      }

      if (!this[keys]) {
        throw new Error('Cant mock dependency ' + keys + '. Dont exists');
      }
      this[keys] = originalDependencies[keys];
      return this[keys];
    }
  }]);
  return TestDependor;
}(Dependor);

module.exports = {
  createFreezeFunction: createFreezeFunction,
  Dependor: testing ? TestDependor : Dependor,
  PRIVATE_NAMESPACE: PRIVATE_NAMESPACE
};