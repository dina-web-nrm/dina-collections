"use strict";

module.exports = function ids(_ref) {
  var item = _ref.item,
      input = _ref.input;
  var _input$value = input.value,
      value = _input$value === undefined ? [] : _input$value;

  var id = item;
  return value.indexOf(id) > -1;
};