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
  operationId,
  raw,
  relationBase,
  relations,
  resource,
  selfLink,
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
    format,
    relationBase,
    relations,
    selfLink,
    versionsLink,
  })
  const links = buildLinks({ selfLink })
  const included = buildIncluded(include)

  const item = buildItem({ resource, relationships })

  const base = buildBase({
    description,
    examples,
    format,
    included,
    item,
    links,
    name,
  })
  return base
}
