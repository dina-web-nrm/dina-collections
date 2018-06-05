const objectPath = require('object-path')

exports.getKeyAllowNull = relationshipsSchemaItem => {
  return (
    relationshipsSchemaItem &&
    objectPath.get(relationshipsSchemaItem, `x-key-allow-null`)
  )
}
exports.getKeyName = relationshipsSchemaItem => {
  return (
    relationshipsSchemaItem &&
    objectPath.get(relationshipsSchemaItem, `x-key-name`)
  )
}
exports.getKeyStoredInModel = relationshipsSchemaItem => {
  return (
    relationshipsSchemaItem &&
    objectPath.get(relationshipsSchemaItem, `x-key-stored-in-model`)
  )
}
exports.getKeyType = relationshipsSchemaItem => {
  return (
    relationshipsSchemaItem &&
    objectPath.get(relationshipsSchemaItem, `x-key-type`)
  )
}
exports.getPath = relationshipsSchemaItem => {
  return (
    relationshipsSchemaItem && objectPath.get(relationshipsSchemaItem, `x-path`)
  )
}
exports.getTargetFormat = relationshipsSchemaItem => {
  return (
    relationshipsSchemaItem &&
    objectPath.get(relationshipsSchemaItem, `properties.data.type`)
  )
}
exports.getTargetModel = relationshipsSchemaItem => {
  const arrayItemRef = objectPath.get(
    relationshipsSchemaItem,
    `properties.data.items.$ref`
  )
  const objectItemRef = objectPath.get(
    relationshipsSchemaItem,
    `properties.data.$ref`
  )

  // if ref is prefixed with e.g. __ROOT__, use only the last part
  const ref = (arrayItemRef || objectItemRef || '').split('__').pop()

  return relationshipsSchemaItem && ref
}
exports.getTargetOneOrMany = relationshipsSchemaItem => {
  const format = exports.getTargetFormat(relationshipsSchemaItem)
  if (!format) {
    return undefined
  }
  return format === 'array' ? 'many' : 'one'
}
