/* eslint-disable no-param-reassign */

module.exports = function createKeyIdMapDecorator({
  keyTransformationMap = {},
  limit = 1000,
  mapName,
  resource,
}) {
  return function keyIdMapDecorator({ serviceInteractor, globals }) {
    return serviceInteractor
      .getMany({
        request: {
          queryParams: { limit },
        },
        resource,
      })
      .then(({ data: items }) => {
        globals[mapName] = items.reduce((obj, item) => {
          const extraKey = keyTransformationMap[item.attributes.key]
          if (extraKey) {
            return {
              ...obj,
              [extraKey]: item.id,
              [item.attributes.key]: item.id,
            }
          }

          return {
            ...obj,
            [item.attributes.key]: item.id,
          }
        }, {})
      })
  }
}
