export default function createCallParams({
  aggregations,
  excludeFields,
  includeDeactivated,
  includeFields,
  limit,
  offset,
  options,
  query,
  scroll,
  scrollId,
  sort,
}) {
  return {
    ...options,
    body: {
      data: {
        attributes: {
          aggregations,
          excludeFields,
          includeDeactivated,
          includeFields,
          limit,
          offset,
          query,
          scroll,
          scrollId,
          sort,
        },
      },
    },
  }
}
