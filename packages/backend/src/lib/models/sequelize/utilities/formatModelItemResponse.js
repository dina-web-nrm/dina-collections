module.exports = function formatModelItemResponse({
  includeInternals = true,
  includeDiff = false,
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

  if (includeDiff) {
    item.diff = (input.dataValues && input.dataValues.diff) || []
  }

  if (includeInternals) {
    item.internals = input.dataValues
  }

  return { item }
}
