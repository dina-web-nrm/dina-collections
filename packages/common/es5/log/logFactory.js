'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug');

var priorityMap = require('./priorityMap');

var scopeMessage = function scopeMessage(message, scopeLevel) {
  if (!scopeLevel) {
    return message;
  }

  var scopeString = '';
  for (var i = 1; i < scopeLevel; i += 1) {
    scopeString = scopeString + ' |';
  }

  return scopeString + ' \u2514\u2500\u2500 ' + message;
};

var createLevelLogFunction = function createLevelLogFunction(_ref) {
  var APP_PREFIX = _ref.APP_PREFIX,
      context = _ref.context,
      output = _ref.output,
      priority = _ref.priority,
      scopeLevel = _ref.scopeLevel;

  var log = debug(APP_PREFIX + ':' + priority + ':' + context);
  if (output === 'log') {
    log.log = console.log.bind(console);
  }
  if (output === 'error') {
    log.log = console.error.bind(console);
  }
  var logFunction = function logFunction(message) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    log.apply(undefined, [scopeMessage(message, scopeLevel)].concat(rest));
  };

  logFunction.enabled = log.enabled;
  return logFunction;
};

var consoleGroupAvailable = !!console.group && !!console.groupCollapsed && !!console.groupEnd;

var createTreeLog = function createTreeLog(_ref2) {
  var APP_PREFIX = _ref2.APP_PREFIX,
      _ref2$rootScopeLevel = _ref2.rootScopeLevel,
      rootScopeLevel = _ref2$rootScopeLevel === undefined ? 0 : _ref2$rootScopeLevel,
      logMethods = _ref2.logMethods,
      treeMessage = _ref2.treeMessage,
      context = _ref2.context;

  var rootNodes = [];
  var treeLogName = APP_PREFIX + ':LOG_DEBUG:' + context;

  var createNode = function createNode(_ref3) {
    var groupName = _ref3.groupName,
        parentNodes = _ref3.parentNodes,
        scopeLevel = _ref3.scopeLevel;

    var nodes = [];
    parentNodes.push({ groupName: groupName, nodes: nodes, scopeLevel: scopeLevel });

    var scope = function scope(groupNameInput) {
      return createNode({
        groupName: consoleGroupAvailable && groupNameInput,
        parentNodes: nodes,
        scopeLevel: scopeLevel + 1
      });
    };

    return (0, _keys2.default)(priorityMap).reduce(function (log, level) {
      return (0, _extends5.default)({}, log, (0, _defineProperty3.default)({}, level, function (message, options) {
        nodes.push({
          level: level,
          message: consoleGroupAvailable ? message : scopeMessage(message, scopeLevel),
          options: options,
          scopeLevel: scopeLevel
        });
      }));
    }, {
      scope: scope
    });
  };

  var print = function print() {
    if (!logMethods.debug.enabled) {
      return;
    }
    var printNodes = function printNodes(currentNodes) {
      currentNodes.forEach(function (node) {
        var nodeMessage = node.message,
            childNodes = node.nodes,
            level = node.level,
            options = node.options,
            groupName = node.groupName;


        if (nodeMessage) {
          if (consoleGroupAvailable) {
            if (options !== undefined) {
              console.log(nodeMessage, options);
            } else {
              console.log(nodeMessage);
            }
          } else {
            logMethods[level](nodeMessage, options);
          }
        } else {
          if (consoleGroupAvailable && groupName) {
            console.group(groupName);
          }

          printNodes(childNodes);
          if (consoleGroupAvailable && groupName) {
            console.groupEnd(groupName);
          }
        }
      });
    };
    printNodes(rootNodes);
  };

  var rootNode = createNode({
    groupName: treeLogName + ' ' + treeMessage,
    parentNodes: rootNodes,
    scopeLevel: rootScopeLevel + 1
  });

  return (0, _extends5.default)({}, rootNode, {
    print: print
  });
};

module.exports = function () {
  var APP_PREFIX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'DINA';

  return function createLog(context) {
    var scopeLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var createScopedLog = function createScopedLog() {
      return createLog(context, scopeLevel + 1);
    };

    var logMethods = (0, _keys2.default)(priorityMap).reduce(function (log, level) {
      var _priorityMap$level = priorityMap[level],
          priority = _priorityMap$level.priority,
          output = _priorityMap$level.output;

      return (0, _extends5.default)({}, log, (0, _defineProperty3.default)({}, level, createLevelLogFunction({
        APP_PREFIX: APP_PREFIX,
        context: context,
        output: output,
        priority: priority,
        scopeLevel: scopeLevel
      })));
    }, {});

    return (0, _extends5.default)({}, logMethods, {
      scope: createScopedLog,
      scopeLevel: scopeLevel,
      tree: function tree(treeMessage) {
        return createTreeLog({
          APP_PREFIX: APP_PREFIX,
          context: context,
          logMethods: logMethods,
          priorityMap: priorityMap,
          scopeLevel: scopeLevel + 1,
          treeMessage: treeMessage
        });
      }
    });
  };
};