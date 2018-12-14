export default function createCallParams({
  aggregations,
  batchLimit = 3000,
  batchNumber = 0,
  excludeFields,
  includeDeactivated,
  includeFields,
  lastBatchOffset = 0,
  limit: totalLimit,
  multipleBatches,
  options,
  query,
  scrollId,
  sort,
  useScroll,
}) {
  let limit
  let offset = 0
  if (!multipleBatches) {
    limit = totalLimit
  } else {
    limit = Math.min(totalLimit, batchLimit)
    if (!useScroll) {
      if (batchNumber > 0) {
        offset = Math.min(totalLimit, lastBatchOffset + batchLimit)
      }
    }
  }

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
          scroll: multipleBatches,
          scrollId,
          sort,
        },
      },
    },
  }
}
