'use strict';

module.exports = function capitalizeFirstLetterOfEachWord(string) {
  if (!string) {
    return string;
  }
  return string.split(' ').map(function (a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }).join(' ');
};