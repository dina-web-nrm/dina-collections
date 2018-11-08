'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncReduce = require('../asyncReduce');
var objectPath = require('object-path');

var isPathValid = function isPathValid(path) {
  var segments = path.split('.');
  if (segments.length === 0) {
    return false;
  }

  return true;
};

var isValueDefined = function isValueDefined(value) {
  return value !== undefined;
};

var isConditionFulfilled = function isConditionFulfilled(condition) {
  return condition === undefined || condition;
};

var setValue = function setValue(_ref) {
  var condition = _ref.condition,
      format = _ref.format,
      obj = _ref.obj,
      path = _ref.path,
      value = _ref.value;

  if (!isPathValid(path)) {
    return null;
  }

  if (!isValueDefined(value)) {
    return null;
  }

  if (!isConditionFulfilled(condition)) {
    return null;
  }

  var formattedValue = value;
  if (format === 'string') {
    formattedValue = '' + formattedValue;
  }
  if (format === 'number') {
    formattedValue = Number(formattedValue);
  }

  objectPath.set(obj, path, formattedValue);
  return obj;
};

var pushValueToArray = function pushValueToArray(_ref2) {
  var obj = _ref2.obj,
      condition = _ref2.condition,
      format = _ref2.format,
      path = _ref2.path,
      value = _ref2.value;

  if (!isPathValid(path)) {
    return null;
  }

  if (!isValueDefined(value)) {
    return null;
  }

  if (!isConditionFulfilled(condition)) {
    return null;
  }

  var formattedValue = value;
  if (format === 'string') {
    formattedValue = '' + formattedValue;
  }
  if (format === 'number') {
    formattedValue = Number(formattedValue);
  }

  objectPath.push(obj, path, formattedValue);
  return obj;
};

var getValue = function getValue(_ref3) {
  var _ref3$clone = _ref3.clone,
      clone = _ref3$clone === undefined ? false : _ref3$clone,
      obj = _ref3.obj,
      path = _ref3.path,
      _ref3$strip = _ref3.strip,
      strip = _ref3$strip === undefined ? false : _ref3$strip;

  if (!isPathValid(path)) {
    return undefined;
  }
  var value = objectPath.get(obj, path);
  if (isValueDefined(value) && strip) {
    objectPath.del(obj, path);
  }
  if (value && clone) {
    return JSON.parse((0, _stringify2.default)(value));
  }
  return value;
};

var getFromGlobals = function getFromGlobals(_ref4) {
  var globals = _ref4.globals,
      mapKey = _ref4.mapKey,
      key = _ref4.key,
      reporter = _ref4.reporter;

  if (!globals[mapKey]) {
    throw new Error('Unknown key: ' + mapKey);
  }
  var path = [mapKey, key].join('.');
  var value = getValue({
    obj: globals,
    path: path
  });

  if (reporter) {
    if (value) {
      reporter.rebuildViewLookupHit({
        id: key,
        resource: mapKey
      });
    } else {
      reporter.rebuildViewLookupMiss({
        id: key === undefined ? 'undefined' : key,
        resource: mapKey
      });
    }
  }
  return value;
};

var migrateValue = function migrateValue(_ref5) {
  var condition = _ref5.condition,
      format = _ref5.format,
      fromPath = _ref5.fromPath,
      src = _ref5.src,
      _ref5$strip = _ref5.strip,
      strip = _ref5$strip === undefined ? false : _ref5$strip,
      target = _ref5.target,
      toPath = _ref5.toPath;

  if (!isPathValid(fromPath)) {
    return;
  }
  if (!isPathValid(toPath)) {
    return;
  }
  if (!isConditionFulfilled(condition)) {
    return;
  }

  var value = getValue({
    obj: src,
    path: fromPath,
    strip: strip
  });

  if (!isValueDefined(value)) {
    return;
  }

  setValue({
    format: format,
    obj: target,
    path: toPath,
    value: value
  });
};

var filterArray = function filterArray(_ref6) {
  var obj = _ref6.obj,
      path = _ref6.path;

  var array = getValue({ obj: obj, path: path });
  if (!isValueDefined(array)) {
    return;
  }

  var value = array.filter(function (item) {
    return !!item;
  });
  setValue({ obj: obj, path: path, value: value });
};

var valueExist = function valueExist(_ref7) {
  var obj = _ref7.obj,
      path = _ref7.path;

  if (!isPathValid(path)) {
    return undefined;
  }
  return getValue({ obj: obj, path: path, strip: false }) !== undefined;
};

var applyTransformationFunctions = function applyTransformationFunctions(_ref8) {
  var item = _ref8.item,
      transformationFunctions = _ref8.transformationFunctions,
      rest = (0, _objectWithoutProperties3.default)(_ref8, ['item', 'transformationFunctions']);

  if (!transformationFunctions) {
    throw new Error('No map functions provided');
  }

  var transformationFunctionsArray = Array.isArray(transformationFunctions) ? transformationFunctions : (0, _keys2.default)(transformationFunctions).map(function (key) {
    return transformationFunctions[key];
  });

  var target = {};

  transformationFunctionsArray.forEach(function (mapFunction) {
    mapFunction((0, _extends3.default)({ src: item, target: target }, rest));
  });
  return target;
};

var applyTransformationFunctionsAsync = function applyTransformationFunctionsAsync(_ref9) {
  var item = _ref9.item,
      transformationFunctions = _ref9.transformationFunctions,
      rest = (0, _objectWithoutProperties3.default)(_ref9, ['item', 'transformationFunctions']);

  if (!transformationFunctions) {
    throw new Error('No map functions provided');
  }

  var transformationFunctionsArray = Array.isArray(transformationFunctions) ? transformationFunctions : (0, _keys2.default)(transformationFunctions).map(function (key) {
    return transformationFunctions[key];
  });

  var target = {};
  var locals = {};
  return asyncReduce({
    initialValue: null,
    items: transformationFunctionsArray,
    reduceFunction: function reduceFunction(_ref10) {
      var transformationFunction = _ref10.item;

      return _promise2.default.resolve().then(function () {
        return transformationFunction((0, _extends3.default)({ locals: locals, src: item, target: target }, rest));
      }).then(function () {
        return null;
      }).catch(function (err) {
        err.scope = transformationFunction.name;
        throw err;
      });
    }
  }).then(function () {
    return target;
  });
};

module.exports = {
  applyTransformationFunctions: applyTransformationFunctions,
  applyTransformationFunctionsAsync: applyTransformationFunctionsAsync,
  filterArray: filterArray,
  getFromGlobals: getFromGlobals,
  getValue: getValue,
  migrateValue: migrateValue,
  pushValueToArray: pushValueToArray,
  setValue: setValue,
  valueExist: valueExist
};