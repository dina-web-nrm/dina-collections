'use strict';

var startString = '## Short description';
var stopString = '#';

module.exports = function splitDescription(description) {
  var descriptionArray = (description || '').split('\n');
  var summaryStart = undefined;
  var summaryStop = undefined;

  descriptionArray.forEach(function (line, index) {
    if (summaryStart !== undefined && line.indexOf(startString) > -1) {
      summaryStart = index;
    }

    if (summaryStop !== undefined && summaryStart && line.indexOf(stopString) > -1) {
      summaryStop = index;
    }
  });

  if (summaryStart) {
    console.log('summaryStart', summaryStart);
    console.log('summaryStop', summaryStop);
  }

  return {
    description: description,
    summary: 'summary to be'
  };
};