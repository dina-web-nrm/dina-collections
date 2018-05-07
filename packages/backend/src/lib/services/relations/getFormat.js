const typeFormatMap = {
  belongsToMany: 'array',
  belongsToOne: 'object',
  children: 'array',
  hasMany: 'array',
  hasOne: 'object',
  parent: 'object',
}

module.exports = function getFormat({ type }) {
  const format = typeFormatMap[type]

  if (!format) {
    throw new Error(`Unknown association type ${type}`)
  }

  return format
}
