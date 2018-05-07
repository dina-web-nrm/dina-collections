'use strict';

var startString = '## Short description';
var stopString = '#';

module.exports = function splitDescription(descriptionInput) {
  var descriptionArray = (descriptionInput || '').split('\n');

  var summaryStart = void 0;
  var summaryStop = void 0;

  descriptionArray.forEach(function (line, index) {
    if (summaryStop === undefined && summaryStart !== undefined && line.indexOf(stopString) > -1) {
      summaryStop = index;
    }
    if (summaryStart === undefined && line.indexOf(startString) > -1) {
      summaryStart = index;
    }
  });

  var description = descriptionInput;
  var summary = '';

  if (summaryStart !== undefined && summaryStop !== undefined) {
    var summaryArray = descriptionArray.splice(summaryStart, summaryStop - summaryStart);
    summary = summaryArray.join(' ').replace(startString, '').replace(new RegExp('#', 'g'), '').trim();

    description = descriptionArray.join('\n').trim();
  }

  return {
    description: description,
    summary: summary
  };
};