module.exports = function createTagSearchFilter({
  description,
  fieldPath,
  key,
}) {
  const typePath = `${fieldPath}.tagType`
  const valuePath = `${fieldPath}.tagValue`

  return {
    description: description || `Search ${fieldPath}`,
    elasticsearch: ({ value }) => {
      const baseQuery = {
        nested: {
          path: fieldPath,
          query: {
            bool: {
              must: [],
            },
          },
        },
      }
      if (value.tagType) {
        baseQuery.nested.query.bool.must.push({
          match_phrase_prefix: {
            [typePath]: {
              query: value.tagType,
            },
          },
        })
      }

      if (value.tagValue) {
        baseQuery.nested.query.bool.must.push({
          match_phrase_prefix: {
            [valuePath]: {
              query: value.tagValue,
            },
          },
        })
      }

      return baseQuery
    },
    inputSchema: {
      type: 'object',
    },
    key,
  }
}

// const searchFilter = {
//   description: 'test',
//   elasticsearch: ({ value }) => {
//     console.log('value', value)

//     const baseQuery = {
//       nested: {
//         path: fieldPath,
//         query: {
//           bool: {
//             must: [],
//           },
//         },
//       },
//     }
//     if (value.tagType) {
//       baseQuery.nested.query.bool.must.push({
//         match_phrase_prefix: {
//           'attributes.tags.testIdentifierTags.tagType': {
//             query: value.tagType,
//           },
//         },
//       })
//     }

//     if (value.tagValue) {
//       baseQuery.nested.query.bool.must.push({
//         match_phrase_prefix: {
//           'attributes.tags.testIdentifierTags.tagValue': {
//             query: value.tagValue,
//           },
//         },
//       })
//     }

//     return baseQuery
//   },
//   inputSchema: {
//     type: 'object',
//   },
//   key: searchFilterName,
// }
