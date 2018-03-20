module.exports = function buildLinks({ selfLink } = {}) {
  if (!selfLink) {
    return undefined
  }
  return {
    properties: {
      self: {
        example: `https://domain${selfLink}`,
        format: 'uri',
        type: 'string',
        'x-faker': 'internet.url',
      },
    },
    type: 'object',
  }
}
