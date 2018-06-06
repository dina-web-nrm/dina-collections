'use strict';

module.exports = function buildBase(_ref) {
  var description = _ref.description,
      examples = _ref.examples,
      format = _ref.format,
      included = _ref.included,
      item = _ref.item,
      links = _ref.links,
      name = _ref.name,
      status = _ref.status;

  var base = {
    description: description || 'this is a desc',
    examples: examples,
    name: name,
    schema: {
      content: {
        additionalProperties: false,
        properties: {
          data: {},
          included: included,
          jsonapi: {
            type: 'object'
          },
          links: links,
          meta: {
            type: 'object'
          }
        },
        type: 'object'
      }
    },
    status: status
  };
  if (format === 'array') {
    base.schema.content.properties.data = {
      additionalProperties: false,
      items: item,
      type: 'array'
    };

    return base;
  }

  base.schema.content.properties.data = {
    oneOf: [item, { type: 'null' }]
  };
  return base;
};