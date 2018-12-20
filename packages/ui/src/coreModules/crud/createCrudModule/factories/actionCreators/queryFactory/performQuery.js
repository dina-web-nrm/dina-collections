import createCallParams from './createCallParams'

export default function performQuery({
  apiClient,
  callParams,
  limit,
  multipleBatches,
  operationId,
  options,
  useScroll,
}) {
  // TODO clean this up and use meta from server to know if scroll is available
  let lastBatchOffset = 0
  let batchNumber = 0
  let lastScrollId
  let lastBatchCallParams
  let nFetchedItems = 0
  const data = []
  const call = () => {
    return Promise.resolve().then(() => {
      lastBatchCallParams = createCallParams({
        ...callParams.body.data.attributes,
        batchNumber,
        lastBatchOffset,
        limit,
        multipleBatches,
        options,
        scrollId: lastScrollId,
        useScroll,
      })

      lastBatchOffset = lastBatchCallParams.body.data.attributes.offset

      return apiClient.call(operationId, lastBatchCallParams).then(response => {
        const { scrollId, nResponseItems = 0, nTotalItems = 0 } =
          (response && response.meta) || {}
        lastScrollId = scrollId

        const {
          offset: lastOffset,
          limit: lastLimit,
          idsInMeta,
        } = lastBatchCallParams.body.data.attributes

        nFetchedItems += nResponseItems
        let items = []
        if (idsInMeta && response.meta.ids) {
          items = response.meta.ids.map(id => {
            return {
              id,
            }
          })
        } else {
          items = response.data
        }

        data.push(...items)

        let doAnotherCall = false
        if (multipleBatches) {
          if (useScroll) {
            doAnotherCall =
              lastScrollId &&
              nResponseItems !== 0 &&
              nFetchedItems < nTotalItems &&
              nFetchedItems < limit
          } else {
            doAnotherCall =
              lastOffset < limit &&
              nResponseItems !== 0 &&
              nResponseItems === lastLimit
          }
        }

        if (doAnotherCall) {
          batchNumber += 1
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
