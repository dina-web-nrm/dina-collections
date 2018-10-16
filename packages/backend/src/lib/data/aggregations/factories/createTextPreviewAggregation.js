const objectPath = require('object-path')

const {
  createSrcFieldKeyPathMap,
  createSrcFieldPathKeyMap,
  getActiveSrcFieldPaths,
} = require('../../filters/factories/createTextSearch/utilities')

module.exports = function createTextPreviewAggregation({
  description,
  resource,
  srcFieldSpecifications,
}) {
  const srcFieldKeyPathMap = createSrcFieldKeyPathMap(srcFieldSpecifications)
  const srcFieldPathKeyMap = createSrcFieldPathKeyMap(srcFieldSpecifications)

  return {
    createHighlight: ({ input }) => {
      const { srcFields: srcFieldKeysInput } = input

      const srcFieldsPaths = getActiveSrcFieldPaths({
        srcFieldKeyPathMap,
        srcFieldKeysInput,
        srcFieldSpecifications,
      })

      const fields = {}

      srcFieldsPaths.forEach(srcFieldPath => {
        fields[srcFieldPath] = {
          post_tags: ['</strong>'],
          pre_tags: ['<strong>'],
        }
      })
      return {
        fields,
      }
    },
    description: description || `Text preview aggregation for: ${resource}`,
    elasticsearch: () => {
      return null
    },
    extractItems: ({ result }) => {
      const hits = objectPath.get(result, `hits.hits`)
      const items = []
      hits.forEach(hit => {
        const { highlight = {}, _source: { id } } = hit
        const highlightKeys = Object.keys(highlight)
        if (highlightKeys.length) {
          highlightKeys.forEach(highlightKey => {
            const highlightArray = highlight[highlightKey]
            highlightArray.forEach(previewString => {
              const srcFieldKey = srcFieldPathKeyMap[highlightKey]
              items.push({
                count: 1,
                key: id,
                preview: previewString,
                srcField: srcFieldKey,
              })
            })
          })
        }
      })

      return items
    },

    inputSchema: {
      type: 'object',
    },
    resource,
  }
}
