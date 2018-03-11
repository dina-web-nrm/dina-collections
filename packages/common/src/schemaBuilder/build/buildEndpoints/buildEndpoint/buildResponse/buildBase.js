module.exports = function buildBase({
  description,
  examples,
  format,
  included,
  item,
  links,
  name,
  status,
}) {
  const base = {
    description: description || 'this is a desc',
    examples,
    name,
    schema: {
      content: {
        additionalProperties: false,
        properties: {
          data: {},
          included,
          jsonapi: {
            type: 'object',
          },
          links,
          meta: {
            type: 'object',
          },
        },
        type: 'object',
      },
    },
    status,
  }
  if (format === 'array') {
    base.schema.content.properties.data = {
      additionalProperties: false,
      items: item,
      type: 'array',
    }

    return base
  }

  base.schema.content.properties.data = item
  return base
}
