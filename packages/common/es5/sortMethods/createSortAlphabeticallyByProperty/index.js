'use strict';

var createSortAlphabeticallyByProperty = function createSortAlphabeticallyByProperty() {
  var sortProperty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'name';

  return function (a, b) {
    if (!a || !b) {
      return 0;
    }

    var valueA = a[sortProperty];
    var valueB = b[sortProperty];

    if (!valueA && !valueB) {
      return 0;
    }

    if (!valueA) {
      return 1;
    }

    if (!valueB) {
      return -1;
    }

    if (valueA < valueB) {
      return -1;
    }

    if (valueA > valueB) {
      return 1;
    }

    return 0;
  };
};

module.exports = createSortAlphabeticallyByProperty;