import debounce from 'lodash.debounce'

import createLog from 'utilities/log'
import globalSelectors from './globalSelectors'
import { fetchTaxonSearchResults } from './actionCreators'
import { TAXONOMY_UPDATE_SEARCH_FILTER_NAME } from './actionTypes'

const log = createLog('domainModules:taxonomy:middleware')

const debounceTaxonSearch = debounce(
  ({ dispatch, getState }) => {
    log.debug('Debounce fetchTaxonSearchResults')
    if (globalSelectors.getLookupSearchFilterName(getState())) {
      dispatch(fetchTaxonSearchResults())
    }
  },
  500,
  {
    maxWait: 1000,
  }
)

export default function taxonomyMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case TAXONOMY_UPDATE_SEARCH_FILTER_NAME: {
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
