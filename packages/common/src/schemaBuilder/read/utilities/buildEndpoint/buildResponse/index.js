const buildRelationships = require('./buildRelationships')
const buildLinks = require('./buildLinks')
const buildIncluded = require('./buildIncluded')
const buildBase = require('./buildBase')
const buildItem = require('./buildItem')
const buildRaw = require('./buildRaw')
/* eslint-disable sort-keys */

module.exports = function buildResponse({
  description,
  examples,
  format,
  include = null,
  modelReference,
  operationId,
  raw,
  relations,
  resource,
  selfLink,
  status,
  versionsLink,
}) {
  const name = `${operationId}Response`
  if (raw) {
    return buildRaw({
      name,
      raw,
    })
  }

  const relationships = buildRelationships({
    relations,
    versionsLink,
  })
  const links = buildLinks({ selfLink })
  const included = buildIncluded(include)

  const item = buildItem({
    modelReference,
    relationships,
    resource,
  })

  const base = buildBase({
    description,
    examples,
    format,
    included,
    item,
    links,
    name,
    status,
  })
  return base
}
