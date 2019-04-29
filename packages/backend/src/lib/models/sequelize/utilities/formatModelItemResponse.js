module.exports = function formatModelItemResponse({
  includeInternals = true,
  diff = null,
  input,
}) {
  if (!input) {
    return {
      item: null,
    }
  }

  let attributes = input.document || {}
  const relationships =
    (input.dataValues && input.dataValues.relationships) ||
    attributes.relationships

  if (attributes.id) {
    attributes = {
      ...attributes,
    }
    delete attributes.id
  }

  if (attributes.relationships) {
    attributes = {
      ...attributes,
    }
    delete attributes.relationships
  }

  const item = {
    attributes,
    id: `${input.dataValues && input.dataValues.id}`,
  }

  if (relationships) {
    item.relationships = relationships
  }

  if (diff) {
    item.diff = diff
  }

  if (includeInternals) {
    item.internals = input.dataValues
  }

  return { item }
}
