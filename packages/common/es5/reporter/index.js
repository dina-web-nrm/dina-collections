'use strict';

var now = require('performance-now');
var objectPath = require('object-path');

module.exports = function createReporter() {
  var report = {};

  var set = function set(_ref) {
    var path = _ref.path,
        value = _ref.value;

    objectPath.set(report, path, value);
  };

  var push = function push(_ref2) {
    var path = _ref2.path,
        value = _ref2.value;

    objectPath.push(report, path, value);
  };

  var get = function get(_ref3) {
    var path = _ref3.path;

    return objectPath.get(report, path);
  };

  var increment = function increment(_ref4) {
    var path = _ref4.path,
        _ref4$count = _ref4.count,
        incrementCount = _ref4$count === undefined ? 1 : _ref4$count;

    var count = get({ path: path });
    if (count === undefined || count === null) {
      count = incrementCount;
    } else {
      count += incrementCount;
    }

    set({ path: path, value: count });
  };

  var getReport = function getReport() {
    return report;
  };

  var start = function start() {
    var startTime = now();
    set({
      path: 'time.start',
      value: startTime
    });
  };

  var done = function done() {
    var endTime = now();
    set({
      path: 'time.end',
      value: endTime
    });

    var startTime = get({
      path: 'time.start'
    });

    var totalTime = endTime - startTime;

    set({
      path: 'time.total',
      value: totalTime + ' ms'
    });
  };

  var rebuildViewDependencyReport = function rebuildViewDependencyReport(_ref5) {
    var dependencyReport = _ref5.dependencyReport;

    set({
      path: 'dependencies',
      value: dependencyReport
    });
  };

  var rebuildViewLookupMiss = function rebuildViewLookupMiss(_ref6) {
    var resource = _ref6.resource,
        id = _ref6.id;

    increment({
      path: 'lookups.overview.' + resource + '.nMisses'
    });
    if (id !== undefined) {
      increment({
        path: 'lookups.details.' + resource + '.missing.' + id
      });
    }
  };

  var rebuildViewLookupHit = function rebuildViewLookupHit(_ref7) {
    var resource = _ref7.resource,
        id = _ref7.id;

    increment({
      path: 'lookups.overview.' + resource + '.nHits'
    });
    if (id !== undefined) {
      increment({
        path: 'lookups.details.' + resource + '.hits.' + id
      });
    }
  };

  var rebuildViewError = function rebuildViewError(_ref8) {
    var index = _ref8.index,
        err = _ref8.err;

    increment({
      path: 'transformation.overview.errors'
    });

    if (index !== undefined) {
      push({
        path: 'transformation.details.indexWithErrors',
        value: index
      });
    }
    if (err !== undefined && err.message) {
      increment({
        path: 'transformation.details.errorMessages.' + err.message
      });
    }
  };

  var rebuildViewValidationError = function rebuildViewValidationError(_ref9) {
    var id = _ref9.id,
        index = _ref9.index;

    increment({
      path: 'transformation.overview.validationErrors'
    });

    if (id !== undefined) {
      push({
        path: 'transformation.details.idsWithValidationErrors',
        value: id
      });
    } else if (index !== undefined) {
      push({
        path: 'transformation.details.indexWithValidationErrors',
        value: index
      });
    }
  };

  var rebuildViewIncrementSrc = function rebuildViewIncrementSrc(_ref10) {
    var items = _ref10.items;

    var count = items ? items.length : 1;
    increment({
      count: count,
      path: 'transformation.overview.nSrcItems'
    });
  };

  var rebuildViewIncrementTarget = function rebuildViewIncrementTarget(_ref11) {
    var items = _ref11.items;

    var count = items ? items.length : 1;
    increment({
      count: count,
      path: 'transformation.overview.nTargetItems'
    });
  };

  var rebuildViewIncrementCustom = function rebuildViewIncrementCustom(_ref12) {
    var items = _ref12.items,
        scope = _ref12.scope;

    var count = items ? items.length : 1;
    increment({
      count: count,
      path: 'transformation.overview.' + scope
    });
  };

  return {
    done: done,
    getReport: getReport,
    increment: increment,
    push: push,
    rebuildViewDependencyReport: rebuildViewDependencyReport,
    rebuildViewError: rebuildViewError,
    rebuildViewIncrementCustom: rebuildViewIncrementCustom,
    rebuildViewIncrementSrc: rebuildViewIncrementSrc,
    rebuildViewIncrementTarget: rebuildViewIncrementTarget,
    rebuildViewLookupHit: rebuildViewLookupHit,
    rebuildViewLookupMiss: rebuildViewLookupMiss,
    rebuildViewValidationError: rebuildViewValidationError,
    start: start
  };
};