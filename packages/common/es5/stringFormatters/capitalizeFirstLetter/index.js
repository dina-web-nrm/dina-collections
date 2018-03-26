"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeFirstLetter;
function capitalizeFirstLetter(string) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}