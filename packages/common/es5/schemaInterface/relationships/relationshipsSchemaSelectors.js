'use strict';

var objectPath = require('object-path');

exports.getKeyAllowNull = function (relationshipsSchemaItem) {
  return relationshipsSchemaItem && objectPath.get(relationshipsSchemaItem, 'x-key-allow-null');
};
exports.getKeyName = function (relationshipsSchemaItem) {
  return relationshipsSchemaItem && objectPath.get(relationshipsSchemaItem, 'x-key-name');
};
exports.getKeyStoredInModel = function (relationshipsSchemaItem) {
  return relationshipsSchemaItem && objectPath.get(relationshipsSchemaItem, 'x-key-stored-in-model');
};
exports.getKeyType = function (relationshipsSchemaItem) {
  return relationshipsSchemaItem && objectPath.get(relationshipsSchemaItem, 'x-key-type');
};
exports.getKeyUnique = function (relationshipsSchemaItem) {
  return relationshipsSchemaItem && objectPath.get(relationshipsSchemaItem, 'x-key-unique');
};
exports.getPath = function (relationshipsSchemaItem) {
  return relationshipsSchemaItem && objectPath.get(relationshipsSchemaItem, 'x-path');
};
exports.getTargetFormat = function (relationshipsSchemaItem) {
  return relationshipsSchemaItem && objectPath.get(relationshipsSchemaItem, 'properties.data.type');
};
exports.getTargetModel = function (relationshipsSchemaItem) {
  var arrayItemRef = objectPath.get(relationshipsSchemaItem, 'properties.data.items.$ref');
  var objectItemRef = objectPath.get(relationshipsSchemaItem, 'properties.data.$ref');

  var ref = (arrayItemRef || objectItemRef || '').split('__').pop();

  return relationshipsSchemaItem && ref;
};
exports.getTargetOneOrMany = function (relationshipsSchemaItem) {
  var format = exports.getTargetFormat(relationshipsSchemaItem);
  if (!format) {
    return undefined;
  }
  return format === 'array' ? 'many' : 'one';
};