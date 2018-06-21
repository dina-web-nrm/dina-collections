import createCallParams from './createCallParams'

export default function performQuery({
  apiClient,
  batchLimit: batchLimitInput = 3000,
  callParams,
  operationId,
  options,
  scroll,
}) {
  let lastScrollId
  let lastBatchCallParams
  let nFetchedItems = 0
  const { limit } = callParams.body.data.attributes
  const batchLimit = Math.min(limit, batchLimitInput)
  const data = []
  const call = () => {
    return Promise.resolve().then(() => {
      lastBatchCallParams = createCallParams({
        ...callParams.body.data.attributes,
        limit: scroll ? batchLimit : limit,
        options,
        scroll,
        scrollId: lastScrollId,
      })
      return apiClient.call(operationId, lastBatchCallParams).then(response => {
        const { scrollId, nResponseItems = 0, nTotalItems = 0 } =
          (response && response.meta) || {}
        lastScrollId = scrollId

        nFetchedItems += nResponseItems
        data.push(...response.data)

        const doAnotherCall =
          scroll &&
          lastScrollId &&
          nFetchedItems !== 0 &&
          nFetchedItems < nTotalItems &&
          nFetchedItems < limit

        if (doAnotherCall) {
          return call()
        }

        return {
          ...response,
          data,
        }
      })
    })
  }

  return call()
}
