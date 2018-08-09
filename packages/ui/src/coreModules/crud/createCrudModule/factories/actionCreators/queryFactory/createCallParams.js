export default function createCallParams({
  aggregations,
  fields,
  limit,
  offset,
  options,
  query,
  scroll,
  scrollId,
}) {
  return {
    ...options,
    body: {
      data: {
        attributes: {
          aggregations,
          fields,
          limit,
          offset,
          query,
          scroll,
          scrollId,
        },
      },
    },
  }
}
