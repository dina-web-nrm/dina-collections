const objectPath = require('object-path')

const {
  createSrcFieldKeyPathMap,
  createSrcFieldPathKeyMap,
  getActiveSrcFieldPaths,
} = require('../../filters/factories/createTextSearch/utilities')

const {
  factory: createRegexpBuilder,
} = require('../../../models/factories/elasticsearch/utilities/regexpBuilder')

const buildRegexp = createRegexpBuilder({ throwOnError: false })

const stripStrong = previewString => {
  return previewString
    .replace(/<strong>+/g, '')
    .replace(/<\/strong>+/g, '')
    .replace(/\.+/g, '')
    .toLowerCase()
}

const whildcardLastChar = word => {
  let preparedString = word
  const lastChar = word[word.length - 1]
  if (!['"', '*', ' '].includes(lastChar)) {
    if (lastChar === '.') {
      preparedString = preparedString.slice(0, -1)
    }

    preparedString = `${preparedString}*`
  }
  return preparedString
}

const prepareSearchString = searchString => {
  if (!searchString) {
    return searchString
  }
  let preparedString = searchString
  let isPhrase = false
  if (searchString.length > 2) {
    isPhrase =
      searchString[0] === '"' && searchString[searchString.length - 1] === '"'
  }
  if (isPhrase) {
    return 'this-is-not-matching-anything'
  }

  const segments = preparedString.split(' ')
  preparedString = segments.map(whildcardLastChar).join(' ')

  return preparedString.toLowerCase()
}

function includeHighlight({ previewString, searchString }) {
  const regexpArray = buildRegexp(prepareSearchString(searchString))

  const regexps = regexpArray.map(str => {
    return new RegExp(str)
  })

  return regexps.every(regexp => {
    return regexp.test(` ${stripStrong(previewString)} `)
  })
}

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
          number_of_fragments: 1,
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
    extractItems: ({ input = {}, result }) => {
      const hits = objectPath.get(result, `hits.hits`)
      const items = []
      hits.forEach(hit => {
        const {
          highlight = {},
          _source: { id },
        } = hit

        const highlightKeys = Object.keys(highlight)
        if (highlightKeys.length) {
          highlightKeys.forEach(highlightKey => {
            const highlightArray = highlight[highlightKey]
            highlightArray.forEach(previewString => {
              const srcFieldKey = srcFieldPathKeyMap[highlightKey]
              if (
                includeHighlight({
                  previewString,
                  searchString: input.searchString,
                })
              ) {
                items.push({
                  count: 1,
                  key: id,
                  tagType: srcFieldKey,
                  tagValue: previewString,
                })
              }
            })
          })
        }
      })

      return items
    },
    includeSource: true,

    inputSchema: {
      type: 'object',
    },
    resource,
  }
}
