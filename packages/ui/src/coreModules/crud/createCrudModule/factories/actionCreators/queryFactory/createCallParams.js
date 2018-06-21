export default function createCallParams({
  aggregations,
  idsOnly,
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
          idsOnly,
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
