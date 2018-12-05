'use strict';

var capitalizeFirstLetter = require('../capitalizeFirstLetter');

module.exports = function capitalizeFirstLetterOfEachWord(string) {
  if (!string) {
    return string;
  }

  return string.split(' ').map(function (word) {
    return capitalizeFirstLetter(word);
  }).join(' ');
};