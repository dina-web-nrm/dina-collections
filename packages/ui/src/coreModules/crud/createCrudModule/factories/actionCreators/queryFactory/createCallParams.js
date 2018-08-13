export default function createCallParams({
  aggregations,
  excludeFields,
  includeFields,
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
          excludeFields,
          includeFields,
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
