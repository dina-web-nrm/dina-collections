import debounce from 'lodash.debounce'

import createLog from 'utilities/log'
import globalSelectors from './globalSelectors'
import { getTaxaForLookup } from './actionCreators'
import { TAXON_SERVICE_UPDATE_SEARCH_QUERY } from './actionTypes'

const log = createLog('domainModules:taxonService:middleware')

const debounceTaxonSearch = debounce(
  ({ dispatch, getState }) => {
    log.debug('Debounce getTaxaForLookup')

    if (globalSelectors.getLookupSearchQuery(getState())) {
      dispatch(
        getTaxaForLookup({
          queryParams: {
            filter: {
              name: globalSelectors.getLookupSearchQuery(getState()),
            },
            limit: 10,
          },
        })
      )
    }
  },
  100,
  {
    maxWait: 500,
  }
)

export default function createTaxonMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case TAXON_SERVICE_UPDATE_SEARCH_QUERY: {
        if (action.payload) {
          debounceTaxonSearch({ dispatch, getState })
        }
        break
      }

      default:
        break
    }
    return result
  }
}
