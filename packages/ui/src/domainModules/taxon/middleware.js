import debounce from 'lodash.debounce'

import createLog from 'utilities/log'
import actionCreators from 'coreModules/crud/actionCreators'
import globalSelectors from './globalSelectors'
import { TAXON_SERVICE_UPDATE_SEARCH_QUERY } from './actionTypes'

const log = createLog('dataModules:taxonService:middleware')

const getTaxonNames = actionCreators.taxonName.getMany

const debounceTaxonSearch = debounce(
  ({ dispatch, getState, inputName }) => {
    log.debug('Debounce getTaxa')
    const searchQuery = globalSelectors.getLookupSearchQuery(
      getState(),
      inputName
    )

    if (searchQuery) {
      dispatch(
        getTaxonNames({
          isLookup: true,
          queryParams: {
            filter: {
              nameSearch: searchQuery,
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
          const { inputName } = action.meta
          debounceTaxonSearch({ dispatch, getState, inputName })
        }
        break
      }

      default:
        break
    }
    return result
  }
}
