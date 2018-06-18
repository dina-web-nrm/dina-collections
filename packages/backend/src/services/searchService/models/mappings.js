module.exports = {
  searchSpecimen: {
    properties: {
      collectingLocations: {
        fields: {
          raw: {
            ignore_above: 256,
            type: 'keyword',
          },
        },
        type: 'text',
      },
      id: {
        fields: {
          keyword: {
            ignore_above: 256,
            type: 'keyword',
          },
        },
        type: 'text',
      },
      identifiers: {
        fields: {
          raw: {
            ignore_above: 256,
            type: 'keyword',
          },
        },
        type: 'text',
      },
    },
  },
}

// POST /searchspecimen/searchSpecimen/_search/
// {
//   "size": 0,
//   "query": {
//     "bool": {
//       "must": [
//         {
//           "match_all": {}
//         },
//         {
//           "match_phrase": {
//             "collectingLocations": {
//               "query": "Stockholm"
//             }
//           }
//         }
//       ],
//       "filter": [],
//       "should": [],
//       "must_not": []
//     }
//   },
//   "aggregations": {
//     "bairro_count": {
//       "terms": {
//         "field": "collectingLocations.raw",
//         "include" : ".*Stockholm.*"
//       }
//     }
//   }
// }

// module.exports = {
//   searchSpecimen: {
//     properties: {
//       catalogNumber: {
//         type: 'text',
//         fields: {
//           keyword: {
//             type: 'keyword',
//             ignore_above: 256,
//           },
//         },
//       },
//       collectingLocation: {
//         properties: {
//           locationN: {
//             type: 'text',
//             fields: {
//               keyword: {
//                 type: 'keyword',
//                 ignore_above: 256,
//               },
//             },
//           },
//           locationT: {
//             type: 'text',
//             fields: {
//               keyword: {
//                 type: 'keyword',
//                 ignore_above: 256,
//               },
//             },
//           },
//           place: {
//             type: 'text',
//             fields: {
//               keyword: {
//                 type: 'keyword',
//                 ignore_above: 256,
//               },
//             },
//           },
//         },
//       },
//       id: {
//         type: 'text',
//         fields: {
//           keyword: {
//             type: 'keyword',
//             ignore_above: 256,
//           },
//         },
//       },
//       identifiers: {
//         properties: {
//           key: {
//             type: 'text',
//             fields: {
//               keyword: {
//                 type: 'keyword',
//                 ignore_above: 256,
//               },
//             },
//           },
//           value: {
//             type: 'text',
//             fields: {
//               keyword: {
//                 type: 'keyword',
//                 ignore_above: 256,
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// }
